import { MatchModule } from './match.module';

describe('MatchModule', () => {
  let matchModule: MatchModule;

  beforeEach(() => {
    matchModule = new MatchModule();
  });

  it('should create an instance', () => {
    expect(matchModule).toBeTruthy();
  });
});
