import React from 'react';
import { expect } from 'chai';
import { render } from '@testing-library/react';
import FilterBy from './FilterBy';
import { filterByOptions } from '../../helpers';

describe('FilterBy', () => {
  it('should correctly render the component when there are no errors', () => {
    const props = {
      filterByOptions,
      onChange: () => {},
      selectedOption: filterByOptions[2],
    };

    const screen = render(<FilterBy {...props} />);

    expect(screen.getByTestId('All upcoming')).to.exist;
    expect(screen.getByTestId('Specific date')).to.exist;
    expect(screen.getByTestId('Custom date range')).to.exist;
  });
});
