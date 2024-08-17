  // useEffect to log query
  useEffect(() => {
    console.log('DEBUG query changed:', query);
  }, [query]);

  // useEffect to log images
  useEffect(() => {
    console.log('DEBUG images changed:', images);
  }, [images]);

  // useEffect to log totalPages
  useEffect(() => {
    console.log('DEBUG totalPages changed:', totalPages);
  }, [totalPages]);

  // useEffect to log currentPage
  useEffect(() => {
    console.log('DEBUG currentPage changed:', currentPage);
  }, [currentPage]);

  // useEffect to log loading status
  useEffect(() => {
    console.log('DEBUG loading changed:', loading);
  }, [loading]);

  // useEffect to log error
  useEffect(() => {
    console.log('DEBUG error changed:', error);
  }, [error]);