import { PersonInfo } from "../po/person";

//是否是多行文本
const isMultiLine = (text: string): boolean => text.includes('\n');

//切割多行文本
const splitMultiLineText = (text: string): string[] => {
    const list = text.split('\n');
    //检测是否有空行
    const result = list.filter((item) => item !== '');
    return result;
};

//检测完整性，判断list是否为4个元素
const checkIntegrity = (list: string[]): boolean => list.length === 4;

//格式化文本
const formatText = (text: string): string[] => {
    //使用正则表达式将所有特殊字符替换为空格
    let newText = text.replace(/[^\u4e00-\u9fa5\dXx]/g, ' ');
    //将多个空格替换为一个空格
    newText = newText.replace(/\s+/g, ' ');
    //去除首尾空格
    newText = newText.trim();
    const list = newText.split(' ')
    if(!checkIntegrity(list)) {
        //抛出错误
        throw new Error('文本格式错误');
    }
    return list;
};

//是否为姓名
const isName = (text: string): boolean => {
    const reg = /^[\u4e00-\u9fa5]{2,4}$/;
    return reg.test(text);
};

//是否为18位身份证
const isIDCard = (text: string): boolean => {
    const reg = /^\d{17}[\dXx]$/;
    return reg.test(text);
};

//是否为8位数字工号
const isJobNumber = (text: string): boolean => {
    const reg = /^\d{8}$/
    return reg.test(text);
};

//根据身份证号码获取性别
const getSexByIdCard = (idCard: string):string=>{
    //获取身份证号码的倒数第二位
    const num = parseInt(idCard.charAt(16));
    //判断奇偶
    return num % 2 === 0 ? '女' : '男';
}

const getPasswordByIdCard = (idCard: string):string=>{
    return idCard.slice(-6);
}


const listToJson = (list: string[]|string): PersonInfo|string => {
    const json:PersonInfo = {
        name: '',
        idCard: '',
        jobNumber: '',
        department: '',
        password: '',
        sex: ''
    };
    if(typeof list === 'string') {
        return '格式有误'
    }
    list.forEach((item) => {
        if(isName(item)) {
            json['name'] = item;
        }else if(isIDCard(item)) {
            json['idCard'] = item;
            json['password'] = getPasswordByIdCard(item);
            json['sex'] = getSexByIdCard(item);
        }else if(isJobNumber(item)) {
            json['jobNumber'] = item;
        }else {
            json['department'] = item;
        }
    });
    return json;
}



export const textFormat = (text: string): (PersonInfo|string)[] => {
    if(isMultiLine(text)) {
        const list = splitMultiLineText(text);
        const result = list.map((item) => {
            let i
            try{
                i=formatText(item)
            }catch(e){
                return '格式有误'
            }
            return listToJson(i);
        });
        return result;
    }
    let i
    try{
        i=formatText(text)
    }catch(e){
        return ['格式有误']
    }
    return [listToJson(i)];
}
