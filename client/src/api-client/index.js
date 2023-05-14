const BASE_URL = 'http://localhost:8080/api';

export async function getAllRoutines() {
  try {
    const response = await fetch(`${BASE_URL}/routines`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
}
