// execute the callback function on each item of the iterable
// issue is, it should be done in chunks of size and if one finished then start the next one only after all chunk finished
export default async function mapAsyncLimit(
  iterable,
  callbackFn,
  size = Infinity
) {
  const results = [];

  for (let i = 0; i < iterable.length; i += size) {
    const chunk = iterable.slice(i, i + size);
    const chunkResults = await Promise.all(chunk.map(callbackFn));

    results.push(...chunkResults);
  }

  return results;
}



export default function mapAsyncLimit(
    iterable,
    callbackFn,
    size = Infinity,
  ){
    return new Promise((resolve, reject) => {
    let nextIndex=0
    const results=[]
    let processed=0
    async function processItem(index){
        try {
            nextIndex+=1
            const result=await callbackFn(iterable[index])
            processed++
            results[index]=result
            if(processed===iterable.length){
                resolve(results)
            }
            if(nextIndex<iterable.length){
                processItem(nextIndex)
            }

        } catch (error) {
            reject(error)
        }


    }
    
    for (let i=0;i<Math.min(size,iterable.lenght);i++){
        processItem(nextIndex)
    }

      
  })}
  