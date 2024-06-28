export function isEmpty(val: any): boolean {
  return val === "" || val === null || val === undefined;
}

export async function sleep(time: number): Promise<any> {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });
}
export async function request(): Promise<void> {
  await sleep(4000);
  console.log("done");
}
