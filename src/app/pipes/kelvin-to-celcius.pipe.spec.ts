import { KelvinToCelciusPipe } from './kelvin-to-celcius.pipe';

describe('KelvinToCelciusPipe', () => {
  it('create an instance', () => {
    const pipe = new KelvinToCelciusPipe();
    expect(pipe).toBeTruthy();
  });

  it('converts the value to kelvin to celcius', () => {
    const pipe = new KelvinToCelciusPipe();
    const celcius = pipe.transform(306.63);
    expect(celcius).toEqual('34');
  })
});
