import path from 'path';
import fs from 'fs';
import { expect } from 'chai';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import sinon from 'sinon';
import { apiRequest, fetchAndUpdateSessionExpiration } from '../../api';
import environment from '../../environment';
import * as ssoModule from '../../sso';
import * as oauthModule from '../../oauth/utilities';

describe('test wrapper', () => {
  const server = setupServer();
  let expected;

  before(() => {
    server.listen();
    server.events.on('request:end', async req => {
      expected = { ...expected, request: req };
    });
    server.events.on('response:mocked', async res => {
      expected = { ...expected, response: res };
    });
  });

  after(() => {
    server.close();
  });

  describe('apiRequest', () => {
    const mockEnv = {
      ...environment,
      isProduction: sinon.stub().returns(true),
    };

    afterEach(() => {
      server.resetHandlers();
      expected = undefined;
      sessionStorage.removeItem('shouldRedirectExpiredSession');
    });

    it('should behave as if in production', async () => {
      await apiRequest('/status', {}, null, null, mockEnv);
      expect(mockEnv.isProduction.called).to.be.true;
    });

    it('should redirect to LoginModal if in production and session expired (401)', async () => {
      server.use(
        rest.get('*', (req, res, ctx) =>
          res(
            ctx.status(401),
            ctx.json({ errors: [{ status: '401', title: 'Unauthorized' }] }),
          ),
        ),
      );

      sessionStorage.setItem('shouldRedirectExpiredSession', 'true');

      Object.defineProperty(window, 'location', {
        value: {
          pathname: '/some-other-page',
          assign: sinon.stub(),
        },
        writable: true,
      });

      try {
        await apiRequest(
          '/status',
          { headers: { 'Content-Type': 'application/json' } },
          null,
          null,
          mockEnv,
        );
      } catch (error) {
        expect(mockEnv.isProduction.called).to.be.true;
        expect(window.location).to.eql(
          '/?next=loginModal&status=session_expired',
        );
      }
    });

    it('should NOT redirect if not in production, even if session expired (401)', async () => {
      const nonProdEnv = {
        ...environment,
        isProduction: sinon.stub().returns(false),
      };

      server.use(
        rest.get('*', (req, res, ctx) =>
          res(
            ctx.status(401),
            ctx.json({ errors: [{ status: '401', title: 'Unauthorized' }] }),
          ),
        ),
      );

      sessionStorage.setItem('shouldRedirectExpiredSession', 'true');

      Object.defineProperty(window, 'location', {
        value: {
          pathname: '/some-other-page',
          assign: sinon.stub(),
        },
        writable: true,
      });

      try {
        await apiRequest(
          '/status',
          { headers: { 'Content-Type': 'application/json' } },
          null,
          null,
          nonProdEnv,
        );
      } catch (error) {
        // Verify there is no redirect outside of production
        expect(nonProdEnv.isProduction.called).to.be.true;
        expect(window.location.assign.called).to.be.false;
      }
    });

    it('should not redirect to /session-expired if on /declined page (status: 401)', async () => {
      server.use(
        rest.get('*', (req, res, ctx) =>
          res(
            ctx.status(401),
            ctx.json({ errors: [{ status: '401', title: 'Unauthorized' }] }),
          ),
        ),
      );

      sessionStorage.setItem('shouldRedirectExpiredSession', 'true');

      Object.defineProperty(window, 'location', {
        value: {
          pathname: '/terms-of-use/declined',
          assign: sinon.stub(),
        },
        writable: true,
      });

      try {
        await apiRequest('/status', {
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        expect(window.location.assign.called).to.be.false;
      }
    });

    it('should not redirect if shouldRedirectExpiredSession is not set (status: 401)', async () => {
      server.use(
        rest.get('*', (req, res, ctx) =>
          res(
            ctx.status(401),
            ctx.json({ errors: [{ status: '401', title: 'Unauthorized' }] }),
          ),
        ),
      );

      Object.defineProperty(window, 'location', {
        value: {
          pathname: '/some-other-page',
          assign: sinon.stub(),
        },
        writable: true,
      });

      try {
        await apiRequest('/status', {
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        expect(window.location.assign.called).to.be.false;
      }
    });

    it('should return JSON when appropriate headers are specified on (status: 200)', async () => {
      const jsonResponse = { status: 'ok' };
      server.use(
        rest.get(/v0\/status/, (req, res, ctx) =>
          res(ctx.status(200), ctx.json(jsonResponse)),
        ),
      );

      const response = await apiRequest('/status', {
        headers: { 'Content-Type': 'application/json' },
      });

      expect(expected.response.body).to.have.a.lengthOf(
        JSON.stringify(jsonResponse).length,
      );
      expect(response.status).to.eql('ok');
    });

    it('should not return JSON on (status: 204)', async () => {
      server.use(
        rest.get(/v0\/status/, (req, res, ctx) => res(ctx.status(204))),
      );

      const response = await apiRequest('/status', {
        headers: { 'Content-Type': 'application/json' },
      });

      expect(response.ok).to.eql(true);
      expect(expected.response.body).to.be.null;
      expect(response.body._readableState.buffer.length).to.eql(0);
    });

    it('should not return JSON on (status: 404)', async () => {
      server.use(
        rest.get('*', (req, res, ctx) =>
          res(
            ctx.status(404),
            ctx.json({ errors: [{ status: '404', title: 'Not found' }] }),
          ),
        ),
      );

      await apiRequest('/status', {
        headers: { 'Content-Type': 'application/json' },
      }).catch(error => {
        expect(expected.response.body).to.not.be.null;
        expect(error).to.deep.equal(JSON.parse(expected.response.body));
      });
    });

    it('should return JSON on (status: 403)', async () => {
      server.use(
        rest.get('*', (req, res, ctx) =>
          res(
            ctx.status(403),
            ctx.json({ errors: [{ status: '403', title: 'Forbidden' }] }),
          ),
        ),
      );

      await apiRequest('/status', {
        headers: { 'Content-Type': 'application/json' },
      }).catch(error => {
        expect(expected.response.body).to.not.be.null;
        expect(error).to.deep.equal(JSON.parse(expected.response.body));
      });
    });

    it('should not impact empty JSON with (status: 202) No Content', async () => {
      server.use(
        rest.delete(
          `https://dev-api.va.gov/my_health/v1/messaging/messages/1`,
          (_, res, ctx) => res(ctx.status(202)),
        ),
      );

      const response = await apiRequest(
        'https://dev-api.va.gov/my_health/v1/messaging/messages/1',
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      expect(response.ok).to.eql(true);
      expect(expected.response.body).to.be.null;
      expect(response.body._readableState.buffer.length).to.eql(0);
    });

    it('should not fail when downloading a file', async () => {
      const benefitLetterOptions = {
        letterName: 'Benefit Summary Letter',
        letterType: 'benefit_summary',
        letterOptions: {
          militaryService: true,
          monthlyAward: true,
          serviceConnectedEvaluation: true,
          chapter35Eligibility: true,
          serviceConnectedDisabilities: true,
        },
      };

      server.use(
        rest.post(
          `https://dev-api.va.gov/v0/letters/benefit_summary`,
          (_, res, ctx) => {
            const pdfFile = fs.readFileSync(
              path.resolve(__dirname, './pdfFixture.pdf'),
            );

            return res(
              ctx.status(200),
              ctx.set('Content-Length', pdfFile.byteLength.toString()),
              ctx.set('Content-Type', 'application/pdf'),
              ctx.body(pdfFile),
            );
          },
        ),
      );

      const response = await apiRequest('/letters/benefit_summary', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(benefitLetterOptions),
      });

      expect(response.bodyUsed).to.be.false;
      expect(response.status).to.eql(200);
      expect(expected.response.body).to.not.be.null;
    });
  });

  describe('fetchAndUpdateSessionExpiration', () => {
    let checkAndUpdateSSOSessionMock;
    let checkOrSetSessionExpirationMock;
    beforeEach(() => {
      checkAndUpdateSSOSessionMock = sinon.stub(
        ssoModule,
        'checkAndUpdateSSOeSession',
      );
      checkOrSetSessionExpirationMock = sinon.stub(
        oauthModule,
        'checkOrSetSessionExpiration',
      );
    });

    afterEach(() => {
      server.resetHandlers();
      expected = undefined;
      checkOrSetSessionExpirationMock.restore();
      checkAndUpdateSSOSessionMock.restore();
    });

    it('calls checkOrSetSessionExpiration and checkAndUpdateSSOSession if the hasSessionSSO flag is set', async () => {
      localStorage.setItem('hasSessionSSO', 'true');
      await fetchAndUpdateSessionExpiration(environment.API_URL, {});
      expect(checkOrSetSessionExpirationMock.callCount).to.equal(1);
      expect(checkAndUpdateSSOSessionMock.callCount).to.equal(1);
    });

    it('does not call checkAndUpdateSSOSession if the hasSessionSSO flag is not set', async () => {
      server.use(
        rest.get(environment.API_URL, (req, res, ctx) =>
          res(ctx.status(500), ctx.json({})),
        ),
      );
      await fetchAndUpdateSessionExpiration(environment.API_URL, {});
      expect(checkAndUpdateSSOSessionMock.callCount).to.equal(0);
      checkAndUpdateSSOSessionMock.restore();
    });

    it('does not call checkOrSetSessionExpiration and checkAndUpdateSSOSession if the url does not include the API url', async () => {
      server.use(
        rest.get(/v0\/status/, (req, res, ctx) =>
          res(ctx.status(404), ctx.json({})),
        ),
      );
      await fetchAndUpdateSessionExpiration(environment.BASE_URL, {});
      expect(checkOrSetSessionExpirationMock.callCount).to.equal(0);
      expect(checkAndUpdateSSOSessionMock.callCount).to.equal(0);
    });
  });
});
