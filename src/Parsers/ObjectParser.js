import Chance from 'chance';
import hoek from 'hoek';
const chance = new Chance();

export default class ObjectParser {
    constructor(parser) {
        this.parser = parser;
    }
    canParse(node) {
        return !!node.properties || node["x-embedded"];
    }

    parse(node) {
        return this.generateObject(node);
    }

    generateObject(node) {
        let ret = {};
        let schema = hoek.clone(node);
        schema = schema.properties || schema;

        if (node["x-embedded"]) {
            schema = node.schema;
            ret = this.parser.parse(schema);
        } else {
            schema = schema.properties || schema;
            for (var k in schema) {
                ret[k] = this.parser.parse(schema[k]);
            }
        }

        return ret;
    }
}
