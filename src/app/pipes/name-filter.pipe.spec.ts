import { NameFilterPipe } from './name-filter.pipe';

describe('FilterPipe', () => {
  it('create an instance', () => {
    const pipe = new NameFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
