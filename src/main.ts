const FALLBACK_IMAGE_URL = '../assets/fallback.svg';

interface Ninja {
    name: string;
    office: string;
    gitHub: string | null;
    twitter: string | null;
    stackOverflow: string | null;
    imagePortraitUrl: string | null;
}

interface ActiveTools {
    searchNameAndOffice: string;
    sortBy: 'name' | 'office';
}

function applyTools(ninjas: Ninja[], tools: ActiveTools): Ninja[] {
    if (tools.searchNameAndOffice) {
        ninjas = ninjas.filter(ninja =>
            ninja.name.toLowerCase().includes(tools.searchNameAndOffice.toLowerCase()) ||
                ninja.office.toLowerCase().includes(tools.searchNameAndOffice.toLowerCase()));
    }
    ninjas = ninjas.slice().sort((a, b) =>
        tools.sortBy === 'name'
            ? a.name.localeCompare(b.name)
            : a.office.localeCompare(b.office) || a.name.localeCompare(b.name));
    return ninjas;
}

function buildNameAndOfficesOptions(ninjas: Ninja[]): string {
    const offices = Array.from(new Set(ninjas.map(ninja => ninja.office)))
        .sort((a, b) => a.localeCompare(b));
    const names = Array.from(new Set(ninjas.map(ninja => ninja.name)))
        .sort((a, b) => a.localeCompare(b));
    return offices.concat(names).map(o => `<option value="${o}"></option>`).join('');
}

function buildNinja(ninja: Ninja): string {
    let externals = '';
    if (ninja.gitHub) {
        externals += `
            <a href="https://github.com/${ninja.gitHub}">
                <img src="../assets/github-square-brands.svg"/>
            </a>
        `;
    }
    if (ninja.twitter) {
        externals += `
            <a href="https://twitter.com/${ninja.twitter}">
                <img src="../assets/twitter-square-brands.svg"/>
            </a>
        `;
    }
    if (ninja.stackOverflow) {
        externals += `
            <a href="https://stackoverflow.com/users/${ninja.stackOverflow}">
                <img src="../assets/stack-overflow-brands.svg"/>
            </a>
        `;
    }
    return `
        <div class="ninja">
            <img src="${ninja.imagePortraitUrl ?? FALLBACK_IMAGE_URL}"/>
            <div class="info-and-externals">
                <div class="info">
                    <div>${ninja.name}</div>
                    <div>Office: ${ninja.office}</div>
                </div>
                <div class="externals">
                    ${externals}
                </div>
            </div>
        </div>
    `;
}

function renderNinjas(mount: Element, ninjas: Ninja[], tools: ActiveTools) {
    ninjas = applyTools(ninjas, tools);
    mount.innerHTML = ninjas.map(buildNinja).join('');
}

async function loadNinjas(): Promise<Ninja[]> {
    return (await fetch('https://api.tretton37.com/ninjas')).json();
}

async function initialize(): Promise<void> {
    const searchNameAndOfficeInput = document.querySelector('#search-name-office') as HTMLInputElement;
    const searchByInput = document.querySelector('#sort-by') as HTMLSelectElement;
    let activeTools: ActiveTools = {
        searchNameAndOffice: searchNameAndOfficeInput.value,
        sortBy: searchByInput.value as 'name'|'office'
    };

    const ninjas = await loadNinjas();
    const mountDatalists = document.querySelector('#name-office-datalist');
    mountDatalists.innerHTML = buildNameAndOfficesOptions(ninjas);

    const mount = document.querySelector('.ninjas');
    renderNinjas(mount, ninjas, activeTools);

    searchNameAndOfficeInput.addEventListener('input', () => {
        activeTools = { ...activeTools, searchNameAndOffice: searchNameAndOfficeInput.value.trim() };
        renderNinjas(mount, ninjas, activeTools);
    });
    
    searchByInput.addEventListener('change', () => {
        activeTools = { ...activeTools, sortBy: searchByInput.value as 'name'|'office' };
        renderNinjas(mount, ninjas, activeTools);
    });
}

initialize();