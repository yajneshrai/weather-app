export interface City {
    coord: {
        lon: number,
        lat: number
    }
    weather: {
        id: number,
        main: string,
        description: string,
    },
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number
    },
    sys: {
        country: string,
        sunrise: number,
        sunset: number
    },
    timezone: number,
    id: number,
    name: string,
    cod: number,
    hourlyForecast?: HourlyForecast[]
};

export interface Profile {
    name: string,
    id: number,
    active: boolean;
    cities: City[]
};

export interface HourlyForecast {
    dt: number,
    weather: {
        id: number,
        main: string,
        description: string,
    },
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number
    },
    clouds: {
        all: number
    },
    visibility: number,
    wind: {
        speed: number,
        deg: number
    },
    pop: number,
    rain: {
        '3h': number
    },
    sys: {
        pod: string
    },
    dt_txt: string,
}
