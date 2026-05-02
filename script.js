import * as THREE from 'three';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import * as TWEEN from '@tweenjs/tween.js';

const CATEGORIES = {
    alkali: { name: 'Alcalino', color: '#ff6b6b' },
    alkaline: { name: 'Alcalinotérreo', color: '#ffa94d' },
    transition: { name: 'Transición', color: '#ffd43b' },
    postTransition: { name: 'Post-transición', color: '#69db7c' },
    metalloid: { name: 'Metaloide', color: '#38d9a9' },
    nonmetal: { name: 'No metal', color: '#4dabf7' },
    halogen: { name: 'Halógeno', color: '#9775fa' },
    noble: { name: 'Gas noble', color: '#e599f7' },
    lanthanide: { name: 'Lantánido', color: '#f783ac' },
    actinide: { name: 'Actínido', color: '#e8590c' },
    unknown: { name: 'Desconocido', color: '#868e96' }
};

const ELEMENTS = [
    { sym: 'H',  name: 'Hydrogen',   mass: '1.008',   x: 1,  y: 1,  cat: 'nonmetal' },
    { sym: 'He', name: 'Helium',     mass: '4.003',   x: 18, y: 1,  cat: 'noble' },
    { sym: 'Li', name: 'Lithium',    mass: '6.941',   x: 1,  y: 2,  cat: 'alkali' },
    { sym: 'Be', name: 'Beryllium',  mass: '9.012',   x: 2,  y: 2,  cat: 'alkaline' },
    { sym: 'B',  name: 'Boron',      mass: '10.811',  x: 13, y: 2,  cat: 'metalloid' },
    { sym: 'C',  name: 'Carbon',     mass: '12.011',  x: 14, y: 2,  cat: 'nonmetal' },
    { sym: 'N',  name: 'Nitrogen',   mass: '14.007',  x: 15, y: 2,  cat: 'nonmetal' },
    { sym: 'O',  name: 'Oxygen',     mass: '15.999',  x: 16, y: 2,  cat: 'nonmetal' },
    { sym: 'F',  name: 'Fluorine',   mass: '18.998',  x: 17, y: 2,  cat: 'halogen' },
    { sym: 'Ne', name: 'Neon',       mass: '20.180',  x: 18, y: 2,  cat: 'noble' },
    { sym: 'Na', name: 'Sodium',     mass: '22.990',  x: 1,  y: 3,  cat: 'alkali' },
    { sym: 'Mg', name: 'Magnesium',  mass: '24.305',  x: 2,  y: 3,  cat: 'alkaline' },
    { sym: 'Al', name: 'Aluminium',  mass: '26.982',  x: 13, y: 3,  cat: 'postTransition' },
    { sym: 'Si', name: 'Silicon',    mass: '28.086',  x: 14, y: 3,  cat: 'metalloid' },
    { sym: 'P',  name: 'Phosphorus', mass: '30.974',  x: 15, y: 3,  cat: 'nonmetal' },
    { sym: 'S',  name: 'Sulfur',     mass: '32.065',  x: 16, y: 3,  cat: 'nonmetal' },
    { sym: 'Cl', name: 'Chlorine',   mass: '35.453',  x: 17, y: 3,  cat: 'halogen' },
    { sym: 'Ar', name: 'Argon',      mass: '39.948',  x: 18, y: 3,  cat: 'noble' },
    { sym: 'K',  name: 'Potassium',  mass: '39.098',  x: 1,  y: 4,  cat: 'alkali' },
    { sym: 'Ca', name: 'Calcium',    mass: '40.078',  x: 2,  y: 4,  cat: 'alkaline' },
    { sym: 'Sc', name: 'Scandium',   mass: '44.956',  x: 3,  y: 4,  cat: 'transition' },
    { sym: 'Ti', name: 'Titanium',   mass: '47.867',  x: 4,  y: 4,  cat: 'transition' },
    { sym: 'V',  name: 'Vanadium',   mass: '50.942',  x: 5,  y: 4,  cat: 'transition' },
    { sym: 'Cr', name: 'Chromium',   mass: '51.996',  x: 6,  y: 4,  cat: 'transition' },
    { sym: 'Mn', name: 'Manganese',  mass: '54.938',  x: 7,  y: 4,  cat: 'transition' },
    { sym: 'Fe', name: 'Iron',       mass: '55.845',  x: 8,  y: 4,  cat: 'transition' },
    { sym: 'Co', name: 'Cobalt',     mass: '58.933',  x: 9,  y: 4,  cat: 'transition' },
    { sym: 'Ni', name: 'Nickel',     mass: '58.693',  x: 10, y: 4,  cat: 'transition' },
    { sym: 'Cu', name: 'Copper',     mass: '63.546',  x: 11, y: 4,  cat: 'transition' },
    { sym: 'Zn', name: 'Zinc',       mass: '65.38',   x: 12, y: 4,  cat: 'transition' },
    { sym: 'Ga', name: 'Gallium',    mass: '69.723',  x: 13, y: 4,  cat: 'postTransition' },
    { sym: 'Ge', name: 'Germanium',  mass: '72.630',  x: 14, y: 4,  cat: 'metalloid' },
    { sym: 'As', name: 'Arsenic',    mass: '74.922',  x: 15, y: 4,  cat: 'metalloid' },
    { sym: 'Se', name: 'Selenium',   mass: '78.971',  x: 16, y: 4,  cat: 'nonmetal' },
    { sym: 'Br', name: 'Bromine',    mass: '79.904',  x: 17, y: 4,  cat: 'halogen' },
    { sym: 'Kr', name: 'Krypton',    mass: '83.798',  x: 18, y: 4,  cat: 'noble' },
    { sym: 'Rb', name: 'Rubidium',   mass: '85.468',  x: 1,  y: 5,  cat: 'alkali' },
    { sym: 'Sr', name: 'Strontium',  mass: '87.62',   x: 2,  y: 5,  cat: 'alkaline' },
    { sym: 'Y',  name: 'Yttrium',    mass: '88.906',  x: 3,  y: 5,  cat: 'transition' },
    { sym: 'Zr', name: 'Zirconium',  mass: '91.224',  x: 4,  y: 5,  cat: 'transition' },
    { sym: 'Nb', name: 'Niobium',    mass: '92.906',  x: 5,  y: 5,  cat: 'transition' },
    { sym: 'Mo', name: 'Molybdenum', mass: '95.95',   x: 6,  y: 5,  cat: 'transition' },
    { sym: 'Tc', name: 'Technetium', mass: '(98)',    x: 7,  y: 5,  cat: 'transition' },
    { sym: 'Ru', name: 'Ruthenium',  mass: '101.07',  x: 8,  y: 5,  cat: 'transition' },
    { sym: 'Rh', name: 'Rhodium',    mass: '102.906', x: 9,  y: 5,  cat: 'transition' },
    { sym: 'Pd', name: 'Palladium',  mass: '106.42',  x: 10, y: 5,  cat: 'transition' },
    { sym: 'Ag', name: 'Silver',     mass: '107.868', x: 11, y: 5,  cat: 'transition' },
    { sym: 'Cd', name: 'Cadmium',    mass: '112.411', x: 12, y: 5,  cat: 'transition' },
    { sym: 'In', name: 'Indium',     mass: '114.818', x: 13, y: 5,  cat: 'postTransition' },
    { sym: 'Sn', name: 'Tin',        mass: '118.710', x: 14, y: 5,  cat: 'postTransition' },
    { sym: 'Sb', name: 'Antimony',   mass: '121.760', x: 15, y: 5,  cat: 'metalloid' },
    { sym: 'Te', name: 'Tellurium',  mass: '127.60',  x: 16, y: 5,  cat: 'metalloid' },
    { sym: 'I',  name: 'Iodine',     mass: '126.904', x: 17, y: 5,  cat: 'halogen' },
    { sym: 'Xe', name: 'Xenon',      mass: '131.293', x: 18, y: 5,  cat: 'noble' },
    { sym: 'Cs', name: 'Caesium',    mass: '132.905', x: 1,  y: 6,  cat: 'alkali' },
    { sym: 'Ba', name: 'Barium',     mass: '137.327', x: 2,  y: 6,  cat: 'alkaline' },
    { sym: 'La', name: 'Lanthanum',  mass: '138.905', x: 4,  y: 9,  cat: 'lanthanide' },
    { sym: 'Ce', name: 'Cerium',     mass: '140.116', x: 5,  y: 9,  cat: 'lanthanide' },
    { sym: 'Pr', name: 'Praseodymium',mass:'140.908', x: 6,  y: 9,  cat: 'lanthanide' },
    { sym: 'Nd', name: 'Neodymium',  mass: '144.242', x: 7,  y: 9,  cat: 'lanthanide' },
    { sym: 'Pm', name: 'Promethium', mass: '(145)',   x: 8,  y: 9,  cat: 'lanthanide' },
    { sym: 'Sm', name: 'Samarium',   mass: '150.36',  x: 9,  y: 9,  cat: 'lanthanide' },
    { sym: 'Eu', name: 'Europium',   mass: '151.964', x: 10, y: 9,  cat: 'lanthanide' },
    { sym: 'Gd', name: 'Gadolinium', mass: '157.25',  x: 11, y: 9,  cat: 'lanthanide' },
    { sym: 'Tb', name: 'Terbium',    mass: '158.925', x: 12, y: 9,  cat: 'lanthanide' },
    { sym: 'Dy', name: 'Dysprosium', mass: '162.500', x: 13, y: 9,  cat: 'lanthanide' },
    { sym: 'Ho', name: 'Holmium',    mass: '164.930', x: 14, y: 9,  cat: 'lanthanide' },
    { sym: 'Er', name: 'Erbium',     mass: '167.259', x: 15, y: 9,  cat: 'lanthanide' },
    { sym: 'Tm', name: 'Thulium',    mass: '168.934', x: 16, y: 9,  cat: 'lanthanide' },
    { sym: 'Yb', name: 'Ytterbium',  mass: '173.045', x: 17, y: 9,  cat: 'lanthanide' },
    { sym: 'Lu', name: 'Lutetium',   mass: '174.967', x: 18, y: 9,  cat: 'lanthanide' },
    { sym: 'Hf', name: 'Hafnium',    mass: '178.49',  x: 4,  y: 6,  cat: 'transition' },
    { sym: 'Ta', name: 'Tantalum',   mass: '180.948', x: 5,  y: 6,  cat: 'transition' },
    { sym: 'W',  name: 'Tungsten',   mass: '183.84',  x: 6,  y: 6,  cat: 'transition' },
    { sym: 'Re', name: 'Rhenium',    mass: '186.207', x: 7,  y: 6,  cat: 'transition' },
    { sym: 'Os', name: 'Osmium',     mass: '190.23',  x: 8,  y: 6,  cat: 'transition' },
    { sym: 'Ir', name: 'Iridium',    mass: '192.217', x: 9,  y: 6,  cat: 'transition' },
    { sym: 'Pt', name: 'Platinum',   mass: '195.084', x: 10, y: 6,  cat: 'transition' },
    { sym: 'Au', name: 'Gold',       mass: '196.967', x: 11, y: 6,  cat: 'transition' },
    { sym: 'Hg', name: 'Mercury',    mass: '200.592', x: 12, y: 6,  cat: 'transition' },
    { sym: 'Tl', name: 'Thallium',   mass: '204.383', x: 13, y: 6,  cat: 'postTransition' },
    { sym: 'Pb', name: 'Lead',       mass: '207.2',   x: 14, y: 6,  cat: 'postTransition' },
    { sym: 'Bi', name: 'Bismuth',    mass: '208.980', x: 15, y: 6,  cat: 'postTransition' },
    { sym: 'Po', name: 'Polonium',   mass: '(209)',   x: 16, y: 6,  cat: 'postTransition' },
    { sym: 'At', name: 'Astatine',   mass: '(210)',   x: 17, y: 6,  cat: 'halogen' },
    { sym: 'Rn', name: 'Radon',      mass: '(222)',   x: 18, y: 6,  cat: 'noble' },
    { sym: 'Fr', name: 'Francium',   mass: '(223)',   x: 1,  y: 7,  cat: 'alkali' },
    { sym: 'Ra', name: 'Radium',     mass: '(226)',   x: 2,  y: 7,  cat: 'alkaline' },
    { sym: 'Ac', name: 'Actinium',   mass: '(227)',   x: 4,  y: 10, cat: 'actinide' },
    { sym: 'Th', name: 'Thorium',    mass: '232.038', x: 5,  y: 10, cat: 'actinide' },
    { sym: 'Pa', name: 'Protactinium',mass:'231.036', x: 6,  y: 10, cat: 'actinide' },
    { sym: 'U',  name: 'Uranium',    mass: '238.029', x: 7,  y: 10, cat: 'actinide' },
    { sym: 'Np', name: 'Neptunium',  mass: '(237)',   x: 8,  y: 10, cat: 'actinide' },
    { sym: 'Pu', name: 'Plutonium',  mass: '(244)',   x: 9,  y: 10, cat: 'actinide' },
    { sym: 'Am', name: 'Americium',  mass: '(243)',   x: 10, y: 10, cat: 'actinide' },
    { sym: 'Cm', name: 'Curium',     mass: '(247)',   x: 11, y: 10, cat: 'actinide' },
    { sym: 'Bk', name: 'Berkelium',  mass: '(247)',   x: 12, y: 10, cat: 'actinide' },
    { sym: 'Cf', name: 'Californium',mass: '(251)',   x: 13, y: 10, cat: 'actinide' },
    { sym: 'Es', name: 'Einsteinium',mass: '(252)',   x: 14, y: 10, cat: 'actinide' },
    { sym: 'Fm', name: 'Fermium',    mass: '(257)',   x: 15, y: 10, cat: 'actinide' },
    { sym: 'Md', name: 'Mendelevium',mass: '(258)',   x: 16, y: 10, cat: 'actinide' },
    { sym: 'No', name: 'Nobelium',   mass: '(259)',   x: 17, y: 10, cat: 'actinide' },
    { sym: 'Lr', name: 'Lawrencium', mass: '(266)',   x: 18, y: 10, cat: 'actinide' },
    { sym: 'Rf', name: 'Rutherfordium',mass:'(267)', x: 4,  y: 7,  cat: 'transition' },
    { sym: 'Db', name: 'Dubnium',    mass: '(268)',   x: 5,  y: 7,  cat: 'transition' },
    { sym: 'Sg', name: 'Seaborgium', mass: '(269)',   x: 6,  y: 7,  cat: 'transition' },
    { sym: 'Bh', name: 'Bohrium',    mass: '(270)',   x: 7,  y: 7,  cat: 'transition' },
    { sym: 'Hs', name: 'Hassium',    mass: '(277)',   x: 8,  y: 7,  cat: 'transition' },
    { sym: 'Mt', name: 'Meitnerium', mass: '(278)',   x: 9,  y: 7,  cat: 'unknown' },
    { sym: 'Ds', name: 'Darmstadtium',mass:'(281)',   x: 10, y: 7,  cat: 'unknown' },
    { sym: 'Rg', name: 'Roentgenium',mass: '(282)',   x: 11, y: 7,  cat: 'unknown' },
    { sym: 'Cn', name: 'Copernicium',mass: '(285)',   x: 12, y: 7,  cat: 'unknown' },
    { sym: 'Nh', name: 'Nihonium',   mass: '(286)',   x: 13, y: 7,  cat: 'unknown' },
    { sym: 'Fl', name: 'Flerovium',  mass: '(289)',   x: 14, y: 7,  cat: 'unknown' },
    { sym: 'Mc', name: 'Moscovium',  mass: '(290)',   x: 15, y: 7,  cat: 'unknown' },
    { sym: 'Lv', name: 'Livermorium',mass: '(293)',   x: 16, y: 7,  cat: 'unknown' },
    { sym: 'Ts', name: 'Tennessine', mass: '(294)',   x: 17, y: 7,  cat: 'unknown' },
    { sym: 'Og', name: 'Oganesson',  mass: '(294)',   x: 18, y: 7,  cat: 'unknown' }
];

let camera, scene, renderer, rendererWebGL, controls;
const objects = [];
const targets = { table: [], sphere: [], helix: [], grid: [] };
let currentLayout = 'table';
let isDark = true;
let activeSearchQuery = '';

buildLegend();
applyTheme(localStorage.getItem('tabla-theme') || 'dark');

init();
animate();

function buildLegend() {
    const container = document.getElementById('legend-items');
    for (const [key, val] of Object.entries(CATEGORIES)) {
        const item = document.createElement('div');
        item.className = 'legend-item';
        item.innerHTML = `<span class="legend-dot" style="background:${val.color}"></span>${val.name}`;
        container.appendChild(item);
    }
}

function applyTheme(theme) {
    isDark = theme === 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tabla-theme', theme);
}

function init() {
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 5000);
    scene = new THREE.Scene();

    const starCount = /Mobi|Android/i.test(navigator.userAgent) ? 3000 : 8000;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
        starPos[i] = (Math.random() - 0.5) * 18000;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, sizeAttenuation: true }));
    stars.name = 'stars';
    scene.add(stars);

    rendererWebGL = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererWebGL.setSize(window.innerWidth, window.innerHeight);
    rendererWebGL.domElement.style.cssText = 'position:absolute;top:0;z-index:0';
    document.getElementById('container').appendChild(rendererWebGL.domElement);

    for (let i = 0; i < ELEMENTS.length; i++) {
        const el = ELEMENTS[i];
        const catColor = CATEGORIES[el.cat]?.color || CATEGORIES.unknown.color;
        const rgb = hexToRgb(catColor);

        const div = document.createElement('div');
        div.className = 'element';
        div.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.12)`;
        div.style.borderColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`;
        div.dataset.index = i;
        div.dataset.symbol = el.sym.toLowerCase();
        div.dataset.name = el.name.toLowerCase();
        div.dataset.cat = el.cat;
        div.innerHTML = `
            <div class="number">${i + 1}</div>
            <div class="symbol" style="color:rgba(${rgb.r},${rgb.g},${rgb.b},0.95)">${el.sym}</div>
            <div class="name">${el.name}</div>
            <div class="mass">${el.mass}</div>
        `;
        div.addEventListener('click', () => showDetail(i));

        const obj = new CSS3DObject(div);
        obj.position.set((Math.random() - 0.5) * 4000, (Math.random() - 0.5) * 4000, (Math.random() - 0.5) * 4000);
        scene.add(obj);
        objects.push(obj);

        targets.table.push(createObj3D((el.x * 110) - 1045, -(el.y * 140) + 850, 0));
        targets.sphere.push(createSpherePos(i, ELEMENTS.length));
        targets.helix.push(createHelixPos(i, ELEMENTS.length));
        targets.grid.push(createGridPos(i, ELEMENTS.length));
    }

    renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.cssText = 'position:absolute;top:0;z-index:1';
    document.getElementById('container').appendChild(renderer.domElement);

    controls = new TrackballControls(camera, renderer.domElement);
    controls.minDistance = 500;
    controls.maxDistance = 8000;
    controls.addEventListener('change', render);

    setupUI();
    transform(targets.table, 2000);

    setTimeout(() => document.getElementById('loading').classList.add('hidden'), 600);
}

function createObj3D(x, y, z) {
    const o = new THREE.Object3D();
    o.position.set(x, y, z);
    return o;
}

function createSpherePos(i, total) {
    const o = new THREE.Object3D();
    const phi = Math.acos(-1 + (2 * i) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;
    o.position.setFromSphericalCoords(800, phi, theta);
    const v = o.position.clone().multiplyScalar(2);
    o.lookAt(v);
    return o;
}

function createHelixPos(i, total) {
    const o = new THREE.Object3D();
    const theta = i * 0.175 + Math.PI;
    const y = -i * 8 + 450;
    o.position.setFromCylindricalCoords(900, theta, y);
    const v = new THREE.Vector3(o.position.x * 2, o.position.y, o.position.z * 2);
    o.lookAt(v);
    return o;
}

function createGridPos(i, total) {
    const o = new THREE.Object3D();
    const cols = 5;
    o.position.set(((i % cols) * 450) - 900, (-Math.floor(i / cols) * 450) + 900, (Math.floor(i / (cols * 5))) * 1000 - 2000);
    return o;
}

function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
}

function setupUI() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const layout = btn.dataset.layout;
            currentLayout = layout;
            transform(targets[layout], 2000);
        });
    });

    document.getElementById('theme-toggle').addEventListener('click', () => {
        applyTheme(isDark ? 'light' : 'dark');
    });

    const searchInput = document.getElementById('search-input');
    const searchClear = document.getElementById('search-clear');
    searchInput.addEventListener('input', (e) => {
        const q = e.target.value.trim().toLowerCase();
        activeSearchQuery = q;
        searchClear.style.display = q ? 'block' : 'none';
        filterElements(q);
    });

    searchClear.addEventListener('click', () => {
        searchInput.value = '';
        activeSearchQuery = '';
        searchClear.style.display = 'none';
        filterElements('');
    });

    document.getElementById('detail-close').addEventListener('click', hideDetail);

    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.className = 'hidden';
    overlay.addEventListener('click', hideDetail);
    document.body.appendChild(overlay);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (!document.getElementById('detail-panel').classList.contains('hidden')) {
                hideDetail();
            } else if (document.activeElement === searchInput) {
                searchInput.blur();
            }
        }
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        const layoutKeys = { '1': 'table', '2': 'sphere', '3': 'helix', '4': 'grid' };
        if (layoutKeys[e.key] && document.activeElement.tagName !== 'INPUT') {
            const layout = layoutKeys[e.key];
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.querySelector(`[data-layout="${layout}"]`).classList.add('active');
            transform(targets[layout], 2000);
        }
    });

    window.addEventListener('resize', onWindowResize);
}

function filterElements(query) {
    objects.forEach((obj, i) => {
        const el = ELEMENTS[i];
        const match = !query || el.sym.toLowerCase().includes(query) || el.name.toLowerCase().includes(query);
        obj.element.classList.toggle('highlighted', match && !!query);
        obj.element.classList.toggle('dimmed', !match && !!query);
    });
}

function showDetail(index) {
    const el = ELEMENTS[index];
    const catColor = CATEGORIES[el.cat]?.color || CATEGORIES.unknown.color;
    const panel = document.getElementById('detail-panel');
    const content = document.getElementById('detail-content');
    content.innerHTML = `
        <div style="font-size:13px;color:var(--text-secondary);margin-bottom:4px">Número atómico</div>
        <div id="detail-number" style="font-family:var(--font-mono);font-size:18px;color:var(--text-primary);margin-bottom:12px">${index + 1}</div>
        <div id="detail-symbol" style="font-size:72px;font-weight:700;color:${catColor}">${el.sym}</div>
        <div id="detail-name" style="font-size:22px;font-weight:600;margin-top:4px">${el.name}</div>
        <div id="detail-mass" style="font-family:var(--font-mono);font-size:14px;color:var(--text-secondary);margin-top:6px">Masa atómica: ${el.mass} u</div>
        <span id="detail-category" style="display:inline-block;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:500;margin-top:14px;background:${catColor};color:#fff">${CATEGORIES[el.cat]?.name || 'Desconocido'}</span>
    `;
    panel.classList.remove('hidden');
    document.getElementById('overlay').classList.remove('hidden');
}

function hideDetail() {
    document.getElementById('detail-panel').classList.add('hidden');
    document.getElementById('overlay').classList.add('hidden');
}

function transform(targetsArray, duration) {
    TWEEN.removeAll();
    for (let i = 0; i < objects.length; i++) {
        const obj = objects[i];
        const target = targetsArray[i];
        new TWEEN.Tween(obj.position)
            .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
        new TWEEN.Tween(obj.rotation)
            .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererWebGL.setSize(window.innerWidth, window.innerHeight);
    render();
}

function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    controls.update();
    const stars = scene.getObjectByName('stars');
    if (stars) {
        stars.rotation.y += 0.00015;
    }
    render();
}

function render() {
    rendererWebGL.render(scene, camera);
    renderer.render(scene, camera);
}
