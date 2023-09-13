import { Injectable, Logger } from '@nestjs/common';
import { Neo4jService } from 'nest-neo4j/dist';
import { response, serviceConstants } from 'src/filters/response';


@Injectable()
export class CommonService {
  constructor(private neo: Neo4jService) {}

  async matchNode(node: any) {
    try {
      Logger.log('in matchNode');
      Logger.verbose('data found :' + node, serviceConstants.common.service);

      const Query = await this.neo.read(`match (n:${node}) return n`);
      const data = Query.records.map((Query) => Query.get('n').properties);
      Logger.verbose('data of database found :' + data.length);

      return Query.records.length > 0
        ? {
            data: data,
            status: true,
            msg: response.Success,
          }
        : {
            data: null,
            status: false,
            msg: response.Failed,
          };
    } catch (error) {
      Logger.error(response.Error + error);
      return error;
    }
  }

  async match(node: any, properties: any, value: any) {
    try {
      Logger.log('in match');
      Logger.verbose(
        'node :' + node,
        'properties :' + properties,
        'value:' + value,
        serviceConstants.common.service,
      );
      const Query = await this.neo.read(
        `MATCH (n:${node} {${properties}: $value}) RETURN n`,
        { value },
      );
      Logger.verbose(
        'node present :' + `${Query.records.length}`,
        serviceConstants.common.service,
      );

      return Query.records.length > 0
        ? {
            status: true,
            data: Query.records[0].get('n').properties,
            msg: response.Success,
          }
        : {
            status: false,
            data: null,
            msg: response.Failed,
          };
    } catch (error) {
      Logger.error(response.Error, error);
      return error;
    }
  }

  async matchNodeRelation(
    node1: any,
    property: any,
    value: any,
    relation: any,
    node2: any,
  ) {
    try {
      Logger.log('in matchNodeRelation');
      Logger.verbose(
        'node1 : ' + node1,
        'property :' + property,
        'value :' + value,
        'relation :' + relation,
        'node2 : ' + node2,
        serviceConstants.common.service,
      );

      const Query = await this.neo.read(
        `MATCH (n:${node1} {${property}: $value })-[r:${relation}]->(d:${node2}) return d`,
        { value },
      );
      const data = Query.records.map((Query) => Query.get('d').properties);
      Logger.verbose(
        'data found in database :' + data.length,
        serviceConstants.common.service,
      );

      return Query.records.length > 0
        ? { data: data, msg: response.Success, status: true }
        : { data: null, msg: response.Failed, status: false };
    } catch (error) {
      Logger.error(response.Error + error, serviceConstants.common.service);
      return { res: error, status: false, msg: response.Error };
    }
  }

  async matchNodeRelation2(
    node1: any,
    property: any,
    value: any,
    relation: any,
    node2: any,
  ) {
    Logger.log('in matchNodeRelation2');
    try {
      Logger.verbose(
        'node1 : ' + node1,
        'property :' + property,
        'value :' + value,
        'relation :' + relation,
        'node2 : ' + node2,
        serviceConstants.common.service,
      );

      const Query = await this.neo.read(
        `MATCH (n: ${node1} {${property}: $value})<-[r:${relation}]-(d:${node2}) return d`,
        { value, node1 },
      );

      const data = Query.records.map((Query) => Query.get('d').properties);
      Logger.verbose(
        'data of database found :' + data.length,
        serviceConstants.common.service,
      );

      return Query.records.length > 0
        ? {
            data: data,
            msg: response.Success,
            status: true,
          }
        : { data: null, msg: response.Failed, status: false };
    } catch (error) {
      Logger.error(response.Error);
      return error;
    }
  }

  async matchProperty(
    node1: any,
    property1: any,
    value1: any,
    relation: any,
    node2: any,
    property2: any,
    value2: any,
  ) {
    Logger.verbose(
      'node1 : ' + node1,
      'property :' + property1,
      'value :' + value1,
      'relation :' + relation,
      'node2 : ' + node2,
      'property2:' + property2,
      'value2:' + value2,
      serviceConstants.common.service,
    );

    try {
      const result = await this.neo.read(
        `
        MATCH (n: ${node1} { ${property1}: $value1 })-[r:${relation}]->(m:${node2} { ${property2}: $value2 })
        RETURN m,n
        `,
        { value1, value2 },
      );

      const data = result.records.map((record) => record.get('m').properties);
      const data2 = result.records.map((record) => record.get('n').properties);
      Logger.verbose(
        'data' + data.length,
        'data2' + data2,
        serviceConstants.common.service,
      );
      return result.records.length > 0
        ? { data: data, data2: data2, msg: response.Success, status: true }
        : { data: null, msg: response.Failed, status: false };
    } catch (error) {
      Logger.error(response.Error, error);
      return error;
    }
  }

  async count(node: any) {
    try {
      Logger.verbose('node' + node, serviceConstants.common.service);
      const Query = await this.neo.read(`match (n:${node}) return count(n)`);
      Logger.verbose(Query.records.length);
      return Query.records.length > 0
        ? {
            data: Query.records[0].get('count(n)'),
            status: true,
            msg: response.Success,
          }
        : {
            data: null,
            status: false,
            msg: response.Failed,
          };
    } catch (error) {
      Logger.error(response.Error);
      return error;
    }
  }

  async filterNode(node: any, properties: any, value: any) {
    try {
      Logger.verbose('node :' + node, serviceConstants.common.service);
      Logger.verbose(
        'properties :' + properties,
        serviceConstants.common.service,
      );
      Logger.verbose('value :' + value, serviceConstants.common.service);
      const query = await this.neo.read(`match (n:${node})
      WHERE n.${properties} =~ '(?i).*${value}.*'
      return n`);
      Logger.log(
        'length :' + query.records.length,
        serviceConstants.common.service,
      );
      const data = query.records.map((query) => query.get('n').properties);
      return query.records.length > 0
        ? { data: data, status: true, msg: response.Success }
        : { data: null, status: false, msg: response.Failed };
    } catch (error) {
      Logger.error(response.Error + error, serviceConstants.common.service);
      return error;
    }
  }
}
