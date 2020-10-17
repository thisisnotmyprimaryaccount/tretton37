const FALLBACK_IMAGE_URL = '../assets/fallback.svg';

interface Ninja {
    name: string;
    office: string;
    gitHub: string | null;
    twitter: string | null;
    stackOverflow: string | null;
    imagePortraitUrl: string | null;
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

function renderNinjas(mount: Element, ninjas: Ninja[]) {
    mount.innerHTML = ninjas.map(buildNinja).join('');
}

async function loadNinjas(): Promise<Ninja[]> {
    return (await fetch('https://api.tretton37.com/ninjas')).json();
}

async function initialize(): Promise<void> {
    const ninjas = await loadNinjas();
    const mount = document.querySelector('.ninjas');
    renderNinjas(mount, ninjas);
}

initialize();