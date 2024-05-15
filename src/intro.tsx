// { type: ‘ul’, props: { ‘class’: ‘list’ }, children: [
// { type: ‘li’, props: { }, children: [‘item 1’] },
// { type: ‘li’, props: { }, children: [‘item 2’] }
// ] }

type Props = { [key: string]: string }; // Assuming a basic Props type, adjust as needed

type CustomElement = {
    type: string;
    props: Props;
    children: (CustomElement | string)[]; // Recursive reference
};

function h(type: string, props: Props, ...children: (CustomElement | string)[]): CustomElement {

    return { type, props, children }
}


console.log(h('ul', { "class": "list" },
    h('li', {}, 'item 1'),
    h('li', {}, 'item 2')
))

console.log(<ul className=' list'><li>item 1</li><li>item 2</li></ul>)

const app = () => (
    <div className="app">
        <h1>Hello, JSX without React!</h1>
        <button onClick={() => alert('Clicked!')}>Click me</button>
    </div>
);
const app2 = () => (
    <ul className=' list'><li>item 1</li><li>item 2</li></ul>
);

document.body.appendChild(app() as unknown as Node);
document.body.appendChild(app2() as unknown as Node);
// document.body.appendChild(App());