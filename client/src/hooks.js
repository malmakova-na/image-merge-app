import { useCallback, useState } from 'react';
import * as api from './dataSource/api';
export const useImgs = () => {
    const [imgs, setImgs] = useState({
      allImgs: [],
    });

    const getPong = useCallback(() => {
        api.getPong().then((svgs) => setImgs(svgs));
      }, []);
    return [imgs, getPong];
    
}

