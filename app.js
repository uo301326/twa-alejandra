import { writeFile } from 'node:fs/promises';
import { items } from './data.js';
import { byCategory, search, top, total, categories } from './catalog.js';

const [cmd, arg] = process.argv.slice(2);

const main = async () => {

    if (!cmd) {
        console.log(items);
    }
    else if (cmd === 'search') {
        console.log(search(items, arg));
    }
    else if (cmd === 'top') {
        console.log(top(items, Number(arg)));
    }
    else if (cmd === 'report') {
        const report = {
            count: items.length,
            total: total(items),
            categories: categories(items),
            top3: top(items, 3)
        };

        await writeFile('report.json', JSON.stringify(report, null, 2));
    }
    else {
        console.log(byCategory(items, cmd));
    }

};

main();