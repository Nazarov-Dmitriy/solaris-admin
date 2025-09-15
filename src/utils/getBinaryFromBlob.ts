export default async function getBinaryFromFile(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result))
      reader.addEventListener('error', (err) => reject(err))
      reader.readAsBinaryString(file)
    })
  }