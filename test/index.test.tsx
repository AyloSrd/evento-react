import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useCreateEvento } from '../src/index';

interface Props {
  onJump: () => void,
}

function Mario(props: Props) {
  const evento = useCreateEvento<Props>(props)
  return <button onClick={() => evento('jump')}> Jump </button>
}

describe('Mario', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Mario onJump={() => console.log('it\'s a me, Mariooo')} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
