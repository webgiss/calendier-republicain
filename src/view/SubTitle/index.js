import Internal from './SubTitle'

import GitInfo from 'react-git-info/macro';
const gitInfo = GitInfo();

const SubTitle = () => {
    const url = 'https://github.com/webgiss/calendrier-republicain'
    const version = `${process.env.REACT_APP_VERSION}-${gitInfo.commit.hash.substring(0, 8)}`;
    return Internal({ url, version })
}

export default SubTitle