const blobToBase64 = (blob) => {
  const fileReader = new window.FileReader()

  return new Promise((resolve) => {
    fileReader.readAsDataURL(blob)
    fileReader.onloadend = function () {
      resolve(fileReader.result)
    }
  })
}

export default blobToBase64
