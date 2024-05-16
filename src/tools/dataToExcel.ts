//导入xslx
import * as XLSX from 'xlsx';
import { PersonInfo } from '../po/person';

export const dataToExcel = async (data: PersonInfo[]) => {
    //读取模板
    const readPath = '/public/批量开户模板.xls'
    const buf = await fetch(readPath).then(res => res.arrayBuffer());
    const workbook = XLSX.read(buf, { type: 'array' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    data.forEach((item,index) => {
        const content = [item.jobNumber, item.password, 2, item.department,item.name, item.sex,item.idCard];
        //插入数据
        XLSX.utils.sheet_add_aoa(worksheet, [content], {origin: `A${index+2}`});
    });
    XLSX.writeFile(workbook,'output.xls',  { bookType: 'biff8', type: 'array' });
}
