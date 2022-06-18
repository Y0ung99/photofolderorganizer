/**
 * 요구사항
 * video, photo, captured, duplicated 폴더 생성
 * video 폴더에 mp4, mov 이동
 * photo 폴더에 jpg 이동 (Exxxx우선[편집된 파일] 중복되는 xxxx는 duplicated 폴더로 이동)
 * captured 폴더에 png, aae 이동
 * duplicated 폴더에 중복되는 xxxx이동
 */

const path = require('path');
const fs = require('fs').promises;
const folderName = `.${path.sep + process.argv[2]}`;
console.log(folderName);

fs.mkdir(`${folderName}${path.sep}video`);
fs.mkdir(`${folderName}${path.sep}photo`);
fs.mkdir(`${folderName}${path.sep}captured`);
fs.mkdir(`${folderName}${path.sep}duplicated`);

fs.readdir(`./${folderName}`)
.then(value => {
    let str = new Array;
    let temp = new Array;

    for(let i = value.length - 1; i >= 0; i--) {
        if (path.extname(value[i]) === '.mp4') {
            fs.copyFile(`${folderName}${path.sep}${value[i]}`,
            `./${folderName}${path.sep}video${path.sep}${value[i]}`);
            console.log(`${value[i]} ${folderName}${path.sep}video로 이동`)
            fs.rm(`${folderName}${path.sep}${value[i]}`);
        }
        if (path.extname(value[i]) === '.mov') {
            fs.copyFile(`${folderName}${path.sep}${value[i]}`, 
            `./${folderName}${path.sep}video${path.sep}${value[i]}`);
            console.log(`${value[i]} ${folderName}${path.sep}video로 이동`)
            fs.rm(`${folderName}${path.sep}${value[i]}`);
        }
        if (path.extname(value[i]) === '.png') {
            fs.copyFile(`${folderName}${path.sep}${value[i]}`, 
            `./${folderName}${path.sep}captured${path.sep}${value[i]}`);
            console.log(`${value[i]} ${folderName}${path.sep}captured로 이동`)
            fs.rm(`${folderName}${path.sep}${value[i]}`);
        }
        if (path.extname(value[i]) === '.aae') {
            fs.copyFile(`${folderName}${path.sep}${value[i]}`, 
            `./${folderName}${path.sep}captured${path.sep}${value[i]}`);
            console.log(`${value[i]} ${folderName}${path.sep}captured로 이동`)
            fs.rm(`${folderName}${path.sep}${value[i]}`);
        }
        if (path.extname(value[i]) === '.jpg') {
            const basename = path.basename(value[i], '.jpg');

            if (basename[4] === 'E') {
                for (let i = 5; i < basename.length; i++) str.push(basename[i]);
                temp.push(str.join(''));
                fs.copyFile(`${folderName}${path.sep}${value[i]}`, 
                `./${folderName}${path.sep}photo${path.sep}${value[i]}`);
                console.log(`${value[i]} ${folderName}${path.sep}photo로 이동`);
                fs.rm(`${folderName}${path.sep}${value[i]}`);
            } // photo 에저장
            else if (temp.some(value => value === basename[4] + basename[5] + basename[6] + basename[7])) {
                fs.copyFile(`${folderName}${path.sep}${value[i]}`, 
                `./${folderName}${path.sep}duplicated${path.sep}${value[i]}`);
                console.log(`${value[i]} ${folderName}${path.sep}duplicated로 이동`);
                fs.rm(`${folderName}${path.sep}${value[i]}`);
            } // duplicated에 저장
            else {
                fs.copyFile(`${folderName}${path.sep}${value[i]}`, 
                `./${folderName}${path.sep}photo${path.sep}${value[i]}`);
                console.log(`${value[i]} ${folderName}${path.sep}photo로 이동`);
                fs.rm(`${folderName}${path.sep}${value[i]}`);
            } // photo에 저장
        }
    }

});