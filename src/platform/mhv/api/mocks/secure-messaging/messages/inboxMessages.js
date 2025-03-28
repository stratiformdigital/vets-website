const { sub, formatISO } = require('date-fns');
const {
  senderInfo,
  categoryInfo,
  triageGroupNames,
} = require('../../constants');

const sampleId = 3601000;

const inboxMessages = {
  data: [
    {
      id: `${sampleId + -50574}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + -50574,
        category: categoryInfo.OTHER,
        subject: 'General Inquiry',
        body: null,
        attachment: false,
        sentDate: `${formatISO(new Date())}`,
        senderId: senderInfo.cb.id,
        senderName: senderInfo.cb.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.DERMATOLOGY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          -50574}`,
      },
    },
    {
      id: `${sampleId + -51415}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + -51415,
        category: categoryInfo.OTHER,
        subject: 'TEST',
        body: null,
        attachment: false,
        sentDate: `${formatISO(new Date())}`,
        senderId: senderInfo.ay.id,
        senderName: senderInfo.ay.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.MHVCOORD,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          -51415}`,
      },
    },
    {
      id: `${sampleId + -200481}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + -200481,
        category: categoryInfo.OTHER,
        subject: 'General Inquiry',
        body: null,
        attachment: false,
        sentDate: `${formatISO(new Date())}`,
        senderId: senderInfo.do.id,
        senderName: senderInfo.do.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.CARDIOLOGY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          -200481}`,
      },
    },
    {
      id: `${sampleId + -342687}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + -342687,
        category: categoryInfo.OTHER,
        subject: 'General Inquiry',
        body: null,
        attachment: false,
        sentDate: `${formatISO(new Date())}`,
        senderId: senderInfo.cb.id,
        senderName: senderInfo.cb.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.AUDIOLOGY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          -342687}`,
      },
    },
    {
      id: `${sampleId + -342752}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + -342752,
        category: categoryInfo.OTHER,
        subject: 'General Inquiry',
        body: null,
        attachment: false,
        sentDate: `${formatISO(sub(new Date(), { days: 20 }))}`,
        senderId: senderInfo.do.id,
        senderName: senderInfo.do.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.AUDIOLOGY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          -342752}`,
      },
    },
    {
      id: `${sampleId + -596299}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + -596299,
        category: categoryInfo.TEST_RESULTS,
        subject: 'Test Results',
        body: null,
        attachment: false,
        sentDate: '2024-09-17T14:55:42.000Z',
        senderId: senderInfo.cw.id,
        senderName: senderInfo.cw.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          -596299}`,
      },
    },
    {
      id: `${sampleId + -596333}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + -596333,
        category: categoryInfo.TEST_RESULTS,
        subject: 'Test Result',
        body: null,
        attachment: false,
        sentDate: '2024-09-17T14:50:00.000Z',
        senderId: senderInfo.cb.id,
        senderName: senderInfo.cb.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          -596333}`,
      },
    },
    {
      id: `${sampleId + -596339}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + -596339,
        category: categoryInfo.APPOINTMENT,
        subject: 'Appointment Follow-up',
        body: null,
        attachment: false,
        sentDate: '2024-07-24T14:48:34.000Z',
        senderId: senderInfo.do.id,
        senderName: senderInfo.do.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.CARDIOLOGY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          -596339}`,
      },
    },
    {
      id: `${sampleId + -596359}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + -596359,
        category: categoryInfo.APPOINTMENT,
        subject: 'Annual physical',
        body: null,
        attachment: false,
        sentDate: '2024-06-05T14:40:52.000Z',
        senderId: senderInfo.do.id,
        senderName: senderInfo.do.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          -596359}`,
      },
    },
    {
      id: `${sampleId + -596368}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + -596368,
        category: categoryInfo.MEDICATIONS,
        subject: 'LOSARTAN 25MG: PRESCRIPTION READY',
        body: null,
        attachment: false,
        sentDate: '2024-04-29T14:37:44.000Z',
        senderId: senderInfo.cw.id,
        senderName: senderInfo.cw.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PHARMACY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          -596368}`,
      },
    },
    {
      id: `${sampleId + -596376}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + -596376,
        category: categoryInfo.MEDICATIONS,
        subject: 'LOSARTAN 25MG: DELAYED',
        body: null,
        attachment: false,
        sentDate: '2024-04-22T14:35:32.000Z',
        senderId: senderInfo.cw.id,
        senderName: senderInfo.cw.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PHARMACY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          -596376}`,
      },
    },
    {
      id: `${sampleId + -596395}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + -596395,
        category: categoryInfo.MEDICATIONS,
        subject: 'Losartan Refill Sent',
        body: null,
        attachment: false,
        sentDate: '2024-04-15T14:30:46.000Z',
        senderId: senderInfo.cb.id,
        senderName: senderInfo.cb.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.CARDIOLOGY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          -596395}`,
      },
    },
    {
      id: `${sampleId + -596407}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + -596407,
        category: categoryInfo.MEDICATIONS,
        subject: 'Losartan Refill Request',
        body: null,
        attachment: false,
        sentDate: '2024-04-10T14:23:25.000Z',
        senderId: senderInfo.cb.id,
        senderName: senderInfo.cb.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          -596407}`,
      },
    },
    {
      id: `${sampleId + -596419}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + -596419,
        category: categoryInfo.EDUCATION,
        subject: 'MOVE Program',
        body: null,
        attachment: false,
        sentDate: '2024-04-08T14:12:32.000Z',
        senderId: senderInfo.do.id,
        senderName: senderInfo.do.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.MHVCOORD,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          -596419}`,
      },
    },
    {
      id: `${sampleId + -596435}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + -596435,
        category: categoryInfo.COVID,
        subject: 'Covid Cases Increasing',
        body: null,
        attachment: false,
        sentDate: '2024-03-09T14:08:22.000Z',
        senderId: senderInfo.do.id,
        senderName: senderInfo.do.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          -596435}`,
      },
    },
    {
      id: `${sampleId + -596449}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + -596449,
        category: categoryInfo.OTHER,
        subject: 'Flu Shot Clinic',
        body: null,
        attachment: false,
        sentDate: '2024-02-16T14:01:58.000Z',
        senderId: senderInfo.ay.id,
        senderName: senderInfo.ay.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          -596449}`,
      },
    },
    {
      id: `${sampleId + -596455}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + -596455,
        category: categoryInfo.OTHER,
        subject: 'Flu Shot Clinic',
        body: null,
        attachment: false,
        sentDate: '2024-02-09T14:00:24.000Z',
        senderId: senderInfo.ay.id,
        senderName: senderInfo.ay.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          -596455}`,
      },
    },
    {
      id: `${sampleId + -596464}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + -596464,
        category: categoryInfo.TEST_RESULTS,
        subject: 'EKG Results',
        body: null,
        attachment: false,
        sentDate: '2024-02-02T13:57:20.000Z',
        senderId: senderInfo.cb.id,
        senderName: senderInfo.cb.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.CARDIOLOGY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          -596464}`,
      },
    },
    {
      id: `${sampleId + -596473}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + -596473,
        category: categoryInfo.APPOINTMENT,
        subject: 'Appointment Request',
        body: null,
        attachment: false,
        sentDate: '2024-02-01T13:55:13.000Z',
        senderId: senderInfo.cb.id,
        senderName: senderInfo.cb.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.AUDIOLOGY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          -596473}`,
      },
    },
    {
      id: `${sampleId + 3}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 3,
        category: categoryInfo.MEDICATIONS,
        subject: 'Joelitol 25MG',
        body: null,
        attachment: false,
        sentDate: '2024-01-19T20:34:40.711Z',
        senderId: senderInfo.jc.id,
        senderName: senderInfo.jc.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PHARMACY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          3}`,
      },
    },
    {
      id: `${sampleId + 13}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 13,
        category: categoryInfo.APPOINTMENT,
        subject: 'Appointment Request',
        body: null,
        attachment: false,
        sentDate: '2024-01-11T20:34:40.711Z',
        senderId: senderInfo.jc.id,
        senderName: senderInfo.jc.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.DERMATOLOGY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          13}`,
      },
    },
    {
      id: `${sampleId + 23}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 23,
        category: categoryInfo.TEST_RESULTS,
        subject: 'Lab Results',
        body: null,
        attachment: false,
        sentDate: '2024-01-05T14:41:18.401Z',
        senderId: senderInfo.cw.id,
        senderName: senderInfo.cw.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.AUDIOLOGY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          23}`,
      },
    },
    {
      id: `${sampleId + 33}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 33,
        category: categoryInfo.APPOINTMENT,
        subject: 'Cancellation',
        body: null,
        attachment: false,
        sentDate: '2023-12-13T20:41:07.627Z',
        senderId: senderInfo.cb.id,
        senderName: senderInfo.cb.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.DERMATOLOGY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          33}`,
      },
    },
    {
      id: `${sampleId + 43}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 43,
        category: categoryInfo.APPOINTMENT,
        subject: 'Appointment Request',
        body: null,
        attachment: false,
        sentDate: '2023-12-11T13:09:36.611Z',
        senderId: senderInfo.cb.id,
        senderName: senderInfo.cb.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.AUDIOLOGY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          43}`,
      },
    },
    {
      id: `${sampleId + 53}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 53,
        category: categoryInfo.APPOINTMENT,
        subject: 'Appointment Request',
        body: null,
        attachment: false,
        sentDate: '2023-10-18T19:13:27.910Z',
        senderId: senderInfo.do.id,
        senderName: senderInfo.do.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.CARDIOLOGY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          53}`,
      },
    },
    {
      id: `${sampleId + 63}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 63,
        category: categoryInfo.OTHER,
        subject: 'Flu Shot Clinic',
        body: null,
        attachment: false,
        sentDate: '2023-11-28T08:22:39.203Z',
        senderId: senderInfo.ay.id,
        senderName: senderInfo.ay.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          63}`,
      },
    },
    {
      id: `${sampleId + 73}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 73,
        category: categoryInfo.OTHER,
        subject: 'Flu Shot Clinic',
        body: null,
        attachment: false,
        sentDate: '2023-11-14T04:18:29.217Z',
        senderId: senderInfo.ay.id,
        senderName: senderInfo.ay.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          73}`,
      },
    },
    {
      id: `${sampleId + 83}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 83,
        category: categoryInfo.APPOINTMENT,
        subject: 'Appointment Request',
        body: null,
        attachment: false,
        sentDate: '2023-10-18T12:50:51.434Z',
        senderId: senderInfo.do.id,
        senderName: senderInfo.do.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          83}`,
      },
    },
    {
      id: `${sampleId + 93}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 93,
        category: categoryInfo.EDUCATION,
        subject: 'Nutrition',
        body: null,
        attachment: false,
        sentDate: '2023-10-14T12:03:36.071Z',
        senderId: senderInfo.mm.id,
        senderName: senderInfo.mm.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          93}`,
      },
    },
    {
      id: `${sampleId + 103}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 103,
        category: categoryInfo.OTHER,
        subject: 'Appointment Follow-up',
        body: null,
        attachment: false,
        sentDate: '2023-08-18T13:13:33.754Z',
        senderId: senderInfo.cb.id,
        senderName: senderInfo.cb.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          103}`,
      },
    },
    {
      id: `${sampleId + 113}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 113,
        category: categoryInfo.TEST_RESULTS,
        subject: 'EKG Results',
        body: null,
        attachment: false,
        sentDate: '2023-08-14T04:25:05.811Z',
        senderId: senderInfo.cb.id,
        senderName: senderInfo.cb.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.CARDIOLOGY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          113}`,
      },
    },
    {
      id: `${sampleId + 123}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 123,
        category: categoryInfo.APPOINTMENT,
        subject: 'Appointment Request',
        body: null,
        attachment: false,
        sentDate: '2023-07-27T01:43:19.682Z',
        senderId: senderInfo.cb.id,
        senderName: senderInfo.cb.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.AUDIOLOGY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          123}`,
      },
    },
    {
      id: `${sampleId + 133}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 133,
        category: categoryInfo.MEDICATIONS,
        subject: 'Joelitol 25MG',
        body: null,
        attachment: false,
        sentDate: '2023-07-14T07:35:53.309Z',
        senderId: senderInfo.jc.id,
        senderName: senderInfo.jc.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          133}`,
      },
    },
    {
      id: `${sampleId + 143}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 143,
        category: categoryInfo.APPOINTMENT,
        subject: 'Appointment Request',
        body: null,
        attachment: false,
        sentDate: '2023-07-06T03:46:36.128Z',
        senderId: senderInfo.jc.id,
        senderName: senderInfo.jc.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          143}`,
      },
    },
    {
      id: `${sampleId + 153}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 153,
        category: categoryInfo.OTHER,
        subject: 'New Office Hours',
        body: null,
        attachment: false,
        sentDate: '2023-05-31T06:25:56.729Z',
        senderId: senderInfo.do.id,
        senderName: senderInfo.do.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          153}`,
      },
    },
    {
      id: `${sampleId + 163}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 163,
        category: categoryInfo.MEDICATIONS,
        subject: 'Renewal Request',
        body: null,
        attachment: false,
        sentDate: '2023-05-17T15:16:02.138Z',
        senderId: senderInfo.do.id,
        senderName: senderInfo.do.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          163}`,
      },
    },
    {
      id: `${sampleId + 173}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 173,
        category: categoryInfo.OTHER,
        subject: 'Contact information update',
        body: null,
        attachment: false,
        sentDate: '2023-05-05T15:06:34.079Z',
        senderId: senderInfo.cb.id,
        senderName: senderInfo.cb.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          173}`,
      },
    },
    {
      id: `${sampleId + 183}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 183,
        category: categoryInfo.TEST_RESULTS,
        subject: 'Test Results',
        body: null,
        attachment: false,
        sentDate: '2023-04-28T18:30:38.309Z',
        senderId: senderInfo.cw.id,
        senderName: senderInfo.cw.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.CARDIOLOGY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          183}`,
      },
    },
    {
      id: `${sampleId + 193}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 193,
        category: categoryInfo.APPOINTMENT,
        subject: 'Appointment Follow-up',
        body: null,
        attachment: false,
        sentDate: '2023-04-25T16:18:46.088Z',
        senderId: senderInfo.cw.id,
        senderName: senderInfo.cw.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.MHVCOORD,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          193}`,
      },
    },
    {
      id: `${sampleId + 203}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 203,
        category: categoryInfo.MEDICATIONS,
        subject: 'Medication Renewal',
        body: null,
        attachment: false,
        sentDate: '2023-04-13T11:34:00.048Z',
        senderId: senderInfo.do.id,
        senderName: senderInfo.do.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PHARMACY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          203}`,
      },
    },
    {
      id: `${sampleId + 213}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 213,
        category: categoryInfo.MEDICATIONS,
        subject: 'Joelitol 25MG',
        body: null,
        attachment: false,
        sentDate: '2023-01-19T19:03:50.922Z',
        senderId: senderInfo.jc.id,
        senderName: senderInfo.jc.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PHARMACY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          213}`,
      },
    },
    {
      id: `${sampleId + 223}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 223,
        category: categoryInfo.APPOINTMENT,
        subject: 'Appointment Request',
        body: null,
        attachment: false,
        sentDate: '2023-01-10T11:45:27.037Z',
        senderId: senderInfo.jc.id,
        senderName: senderInfo.jc.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.CARDIOLOGY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          223}`,
      },
    },
    {
      id: `${sampleId + 233}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 233,
        category: categoryInfo.TEST_RESULTS,
        subject: 'EKG Results',
        body: null,
        attachment: false,
        sentDate: '2022-12-13T09:09:06.828Z',
        senderId: senderInfo.cb.id,
        senderName: senderInfo.cb.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.CARDIOLOGY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          233}`,
      },
    },
    {
      id: `${sampleId + 243}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 243,
        category: categoryInfo.TEST_RESULTS,
        subject: 'Test Results',
        body: null,
        attachment: false,
        sentDate: '2022-12-02T18:45:31.656Z',
        senderId: senderInfo.cw.id,
        senderName: senderInfo.cw.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.CARDIOLOGY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          243}`,
      },
    },
    {
      id: `${sampleId + 253}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 253,
        category: categoryInfo.OTHER,
        subject: 'Flu Shot Clinic',
        body: null,
        attachment: false,
        sentDate: '2022-11-28T19:03:55.111Z',
        senderId: senderInfo.ay.id,
        senderName: senderInfo.ay.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          253}`,
      },
    },
    {
      id: `${sampleId + 263}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 263,
        category: categoryInfo.APPOINTMENT,
        subject: 'Appointment Request',
        body: null,
        attachment: false,
        sentDate: '2022-11-15T02:35:46.687Z',
        senderId: senderInfo.cw.id,
        senderName: senderInfo.cw.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          263}`,
      },
    },
    {
      id: `${sampleId + 273}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 273,
        category: categoryInfo.APPOINTMENT,
        subject: 'Appointment Request',
        body: null,
        attachment: false,
        sentDate: '2022-11-15T12:19:41.464Z',
        senderId: senderInfo.cb.id,
        senderName: senderInfo.cb.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          273}`,
      },
    },
    {
      id: `${sampleId + 283}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 283,
        category: categoryInfo.OTHER,
        subject: 'Flu Shot Clinic',
        body: null,
        attachment: false,
        sentDate: '2022-11-14T19:25:26.194Z',
        senderId: senderInfo.cy.id,
        senderName: senderInfo.cy.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          283}`,
      },
    },
    {
      id: `${sampleId + 293}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 293,
        category: categoryInfo.APPOINTMENT,
        subject: 'Appointment Request',
        body: null,
        attachment: false,
        sentDate: '2022-10-18T08:21:45.629Z',
        senderId: senderInfo.do.id,
        senderName: senderInfo.do.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          293}`,
      },
    },
    {
      id: `${sampleId + 303}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 303,
        category: categoryInfo.APPOINTMENT,
        subject: 'Appointment Request',
        body: null,
        attachment: false,
        sentDate: '2022-09-15T13:10:31.933Z',
        senderId: senderInfo.cw.id,
        senderName: senderInfo.cw.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          303}`,
      },
    },
    {
      id: `${sampleId + 313}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 313,
        category: categoryInfo.TEST_RESULTS,
        subject: 'Test Results',
        body: null,
        attachment: false,
        sentDate: '2022-08-17T22:47:36.276Z',
        senderId: senderInfo.cb.id,
        senderName: senderInfo.cb.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.AUDIOLOGY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          313}`,
      },
    },
    {
      id: `${sampleId + 323}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 323,
        category: categoryInfo.OTHER,
        subject: 'Bug Bite',
        body: null,
        attachment: false,
        sentDate: '2022-07-05T09:12:50.714Z',
        senderId: senderInfo.do.id,
        senderName: senderInfo.do.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          323}`,
      },
    },
    {
      id: `${sampleId + 333}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 333,
        category: categoryInfo.MEDICATIONS,
        subject: 'Joelitol 25MG',
        body: null,
        attachment: false,
        sentDate: '2022-07-14T01:22:37.859Z',
        senderId: senderInfo.jc.id,
        senderName: senderInfo.jc.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          333}`,
      },
    },
    {
      id: `${sampleId + 343}`,
      type: 'messages',
      attributes: {
        messageId: sampleId + 343,
        category: categoryInfo.APPOINTMENT,
        subject: 'Appointment Request',
        body: null,
        attachment: false,
        sentDate: '2022-07-06T10:17:06.028Z',
        senderId: senderInfo.jc.id,
        senderName: senderInfo.jc.name,
        recipientId: 2991831,
        recipientName: 'LEE, JAMIE',
        readReceipt: 'READ',
        triageGroupName: triageGroupNames.PRIMARY,
        proxySenderName: null,
      },
      links: {
        self: `http://127.0.0.1:3000/my_health/v1/messaging/threads/${sampleId +
          343}`,
      },
    },
  ],
};

module.exports = {
  inboxMessages,
};
