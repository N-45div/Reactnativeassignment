const headers = {
    accept: 'application/json',
};

export const Fetchhouses = async () => {
    const url = `https://678f678849875e5a1a91b27f.mockapi.io/houses`;
    const options = {
        method: 'GET',
        headers,
    }
    const response = await fetch(url , options);
    if(!response.ok){
      throw new Error("No Response")
    }
    return response.json();
}