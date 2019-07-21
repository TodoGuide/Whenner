

export class LocalStorageService<T> {

  constructor(public key: string, private defaultReadValue: T){}

  read(): Promise<T> {
    const self = this;
    return new Promise<T>((resolve, reject) => {
      // Simulate slow read
      setTimeout(function() {
        resolve(
          JSON.parse(localStorage.getItem(self.key) || "null") || self.defaultReadValue
        );
      }, 0);
    });
  }

  write(item: T): Promise<T>{
    const self = this;
    return new Promise<T>((resolve, reject) => {
      // Simulate slow write
      setTimeout(function() {
        localStorage.setItem(self.key, JSON.stringify(item));
        resolve(item);
      }, 0);
    });
  }
}