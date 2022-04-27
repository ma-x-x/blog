import { hash } from 'bcrypt';
import DB from '@databases';
import { CreateDictDto, QueryDictsDto } from '@dtos/dicts.dto';
import { HttpException } from '@exceptions/HttpException';
import { Dict } from '@interfaces/dicts.interface';
import { isEmpty } from '@utils/util';

export interface PageDictResult {
  rows: Dict[];
  count: number;
}

class DictService {
  public dicts = DB.Dicts;

  public async findDictsByCode(codeId: string): Promise<Dict[]> {
    // @ts-ignore
    const dicts: Dict[] = await this.userDict.findAll({ where: { dict_code: codeId } });

    return dicts;
  }

  public async findAllDict({ limit, offset, name }: QueryDictsDto): Promise<PageDictResult> {
    let where = {};
    if (name) {
      where: {
        name: `%${name ?? ''}%`;
      }
    }
    const allDict: PageDictResult = await this.dicts.findAndCountAll({
      order: [['id', 'DESC']],
      where,
      offset,
      limit,
    });
    return allDict;
  }

  public async createDict(data: CreateDictDto): Promise<Dict> {
    if (isEmpty(data)) throw new HttpException(400, '参数不能为空');

    const createDictData: Dict = await this.dicts.create(data);
    return createDictData;
  }

  public async updateDict(id: number, data: CreateDictDto): Promise<Dict> {
    if (isEmpty(data)) throw new HttpException(400, '参数不能为空');

    const findDict: Dict = await this.dicts.findByPk(id);
    if (!findDict) throw new HttpException(409, '不存在');

    await this.dicts.update(data, { where: { id: id } });

    const updateDict: Dict = await this.dicts.findByPk(id);
    return updateDict;
  }

  public async deleteDict(id: number): Promise<Dict> {
    if (isEmpty(id)) throw new HttpException(400, '参数id不能为空');

    const findDict: Dict = await this.dicts.findByPk(id);
    if (!findDict) throw new HttpException(409, '不存在');

    await this.dicts.destroy({ where: { id } });

    return findDict;
  }
}

export default DictService;
