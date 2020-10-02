export const _isStr = (val: any): string => {
    if (val && typeof val === 'string') {
        return val;
    }
  
    throw new Error(`Invalid config variable`);
  }