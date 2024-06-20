

// export const getLiveMatches = async () => {
//     const res = await fetch(`https://v3.football.api-sports.io/fixtures?live=all`, {
//         headers: {
//             "X-RapidAPI-Key": `${KEY}`,
//             "X-RapidAPI-Host": `${API_HOST}`,
//         },
//     });

//     const json = await res.json();
//     console.log('res', json.response)

//     // @TODO: use this when fetch all available matches (including live, upcoming, TBC and etc)
//     // let newArray = [];
//     // let league = {
//     //     id: '',
//     //     countryName: '',
//     //     countryFlag: '',
//     //     matches: []
//     // };

//     // json.response.forEach((match) => {
//     //     if (league.id !== match.league.id) {
//     //         league = {
//     //             id: match.league.id,
//     //             countryLeageName: match.league.name,
//     //             countryName: match.league.country,
//     //             countryFlag: match.league.flag,
//     //             matches: []
//     //         };
//     //         newArray.push(league);
//     //     }
//     //     league.matches.push(match);
//     // });

//     // console.log(newArray)
//     return json.response;
// };

export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export const getFixturesByDate = async (date) => {
  const res = await fetch(`https://v3.football.api-sports.io/fixtures?date=${date}`, {
    headers: {
      "X-RapidAPI-Key": `${KEY}`,
      "X-RapidAPI-Host": `${API_HOST}`,
    },
  });

  const json = await res.json();
  // console.log('res', json.response);

  return json.response;
}


export const getFixtureDetails = async (matchId) => {
  try {
    const response = await fetch(`https://v3.football.api-sports.io/fixtures?id=${matchId}`, {
      headers: {
        "X-RapidAPI-Key": `${KEY}`,
        "X-RapidAPI-Host": `${API_HOST}`,
      },
    });
    const data = await response.json();
    return data.response;

  } catch (error) {
    console.log(error)
  }
}

export const getMatchLineups = async (matchId) => {
  try {
    const response = await fetch(`https://api-football-v1.p.rapidapi.com/v3/fixtures/lineups?fixture=${matchId}`, {
      headers: {
        "X-RapidAPI-Key": `${KEY}`,
        "X-RapidAPI-Host": `${API_HOST}`,
      },
    });
    const data = await response.json();
    console.log('data');
    return data.response;

  } catch (error) {
    console.log(error)
  }
}

export const getMatchPrediction = async (matchId) => {
  try {
    const response = await fetch(`https://v3.football.api-sports.io/predictions?fixture=${matchId}`, {
      headers: {
        "X-RapidAPI-Key": `${KEY}`,
        "X-RapidAPI-Host": `${API_HOST}`,
      },
    });
    const data = await response.json();
    // console.log('data', data);
    return data.response;

  } catch (error) {
    console.log(error)
  }
}

export const getLiveMatches = async () => {
  const url = 'https://v3.football.api-sports.io/fixtures?live=all';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'cc75ed977b6ff2922bde04c86f092d58',
      'X-RapidAPI-Host': 'v3.football.api-sports.io'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    return result.response;
  } catch (error) {
    throw new Error('error', error)
  }
}

export const getMatchDetails = async (matchId) => {
  const url = `https://v3.football.api-sports.io/fixtures?id=${matchId}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': KEY,
      'X-RapidAPI-Host': API_HOST
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    return result.response;
  } catch (error) {
    console.error(error);
    throw error; // Ensure the error is rethrown for proper handling
  }
};

export const getStadium = async (matchId) => {
  const url = `https://api-football-v1.p.rapidapi.com/v3/venues?id=${matchId}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': KEY,
      'X-RapidAPI-Host': API_HOST
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    return result.response;
  } catch (error) {
    console.error(error);
  }
}

export const getButterflyStatistics = async (matchId) => {
  const url = `https://v3.football.api-sports.io/fixtures/statistics?fixture=${matchId}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': KEY,
      'X-RapidAPI-Host': API_HOST
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    return result.response;

  } catch (error) {
    console.error(error);
  }
}