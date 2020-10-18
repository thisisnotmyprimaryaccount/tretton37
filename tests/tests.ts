import { Ninja, applyTools, buildNameAndOfficesOptions } from '../app/app';
import { assert } from 'chai';

describe('applyTools', () => {
    let ninjas = new Array<Ninja>();
    beforeEach(() => {
        ninjas = [
            {
                name: 'John Doe',
                office: 'Höör',
                gitHub: null,
                twitter: null,
                stackOverflow: null,
                imagePortraitUrl: null
            },
            {
                name: 'Jane Doe',
                office: 'Oxie',
                gitHub: null,
                twitter: null,
                stackOverflow: null,
                imagePortraitUrl: null
            },
            {
                name: 'John Doe II',
                office: 'Eslöv',
                gitHub: null,
                twitter: null,
                stackOverflow: null,
                imagePortraitUrl: null
            }
        ];
    });

    it('Should sort ninjas', () => {
        let sorted = applyTools(ninjas, {
            searchNameAndOffice: '',
            sortBy: 'name'
        });
        assert.lengthOf(sorted, 3);
        assert.equal(sorted[0].name, 'Jane Doe');
        assert.equal(sorted[1].name, 'John Doe');
        assert.equal(sorted[2].name, 'John Doe II');
        sorted = applyTools(ninjas, {
            searchNameAndOffice: '',
            sortBy: 'office'
        });
        assert.equal(sorted[0].office, 'Eslöv');
        assert.equal(sorted[1].office, 'Höör');
        assert.equal(sorted[2].office, 'Oxie');
    });

    it('Should filter ninjas', () => {
        let filtered = applyTools(ninjas, {
            searchNameAndOffice: 'jo',
            sortBy: 'name'
        });
        assert.lengthOf(filtered, 2);
        assert.equal(filtered[0].name, 'John Doe');
        assert.equal(filtered[1].name, 'John Doe II');
        filtered = applyTools(ninjas, {
            searchNameAndOffice: 'ox',
            sortBy: 'name'
        });
        assert.lengthOf(filtered, 1);
        assert.equal(filtered[0].office, 'Oxie');
    });
});

describe('buildNameAndOfficesOptions', () => {
    it('Should build option elements based on names and offices', () => {
        const ninjas: Array<Ninja> = [
            {
                name: 'John Doe',
                office: 'Höör',
                gitHub: null,
                twitter: null,
                stackOverflow: null,
                imagePortraitUrl: null
            },
            {
                name: 'John Doe',
                office: 'Oxie',
                gitHub: null,
                twitter: null,
                stackOverflow: null,
                imagePortraitUrl: null
            },
            {
                name: 'Jane Doe',
                office: 'Oxie',
                gitHub: null,
                twitter: null,
                stackOverflow: null,
                imagePortraitUrl: null
            }
        ];
        const options = buildNameAndOfficesOptions(ninjas);
        assert.equal(options, 
            '<option value="Höör"></option>' +
            '<option value="Oxie"></option>' +
            '<option value="Jane Doe"></option>' +
            '<option value="John Doe"></option>');
    })
});