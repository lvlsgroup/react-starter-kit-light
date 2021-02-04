const loadScript = (scriptId, scriptSrc, callback) => {
  const existingScript = document.getElementById(scriptId);
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.id = scriptId;
    script.async = true;
    script.defer = true;
    script.crossorigin = 'anonymous';
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) callback();
    };
  }
  if (existingScript && callback) callback();
};

export default loadScript;
