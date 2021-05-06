function useLocalStorage(keyname: string) {
  const storeImages = (images: string[]) => {
    window.localStorage.setItem(
      keyname,
      JSON.stringify({ userImages: images })
    );
  };

  const retrieveImages = () => {
    const dat = window.localStorage.getItem(keyname);
    if (dat) {
      return JSON.parse(dat).userImages;
    }
  };

  return { storeImages, retrieveImages };
}

export default useLocalStorage;
