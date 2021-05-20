import HTTPService from './HTTPService';

export const getMapboxToken = () => {
    return process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
};

export async function searchLocation(
    location: string
): Promise<[number, number, number, number]> {
    const resp = await HTTPService.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(
            location
        )}.json`,
        { access_token: getMapboxToken(), limit: 3 }
    );
    return resp.data.features.length > 0 && resp.data.features[0].bbox;
}
