const contentApi = async (query) => {
    try {
      const response = await fetch(query);
  
      if (response.status === 200) {
        return await response.json();
      } else {
        throw new Error(`${query}-failure-${response.status}`);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  export { contentApi };
  