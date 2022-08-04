import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useCreateEvento, useExpCreateEvento, withEvento, Evento, HOCProps } from '../src/index';

type MarioProps = {
  onJump: (e: CustomEvent<string>) => void,
  onShoot: (e: CustomEvent<string>) => void,
  onTryingCase?: (e: CustomEvent<number>) => void,
  test?: any,
}

type PeachProps = {
  isBowserNear: boolean,
  onSaveMario: (e: CustomEvent<string>) => void,
  shouldSaveMario: boolean,
}

type BowserProps = {
  evilnessLevel: string,
  onEvaluateEveilness: (e: CustomEvent<string>) => void
}

type ShroomProps = {
  onEatMe: (e: CustomEvent<string>) => void,
}

type BoxProps = {
  color: string,
  onBreak?: (e: CustomEvent<{ shouldBreak: boolean }>) => void,
  onReleaseShroom: () => void,
}

type KoopaProps = {
  speed: number,
  onRun: (e: CustomEvent<number>) => void,
}

type YoshiProps = {
  onForwardedClick: (e?: React.MouseEvent<HTMLButtonElement>) => void
}

const Mario = (props: MarioProps) => {
  const evento = useCreateEvento(props)
  const handleClickA = () => evento('jump', 'it\'s a me...')
  const handleClickB = () => evento('shoot', '...Mariooo!')


  return (
    <div>
      <button onClick={handleClickA}>A</button>
      <button onClick={handleClickB}>B</button>
    </div>
  )
}

const Level = () => 
  <>
    <Mario
      onJump={e => console.log(e.detail)}
      onShoot={e => console.log(e.detail)}
    />
  </> 

const ShroomContainer = (props: HOCProps<ShroomProps>) => {
  const { evento } = props
  const handleClick = () => evento("eatMe", "I'll give you super-powers!")
  return (
    <div>
      <button onClick={handleClick}>A</button>
    </div>
  )
}

const Shroom = withEvento<ShroomProps>(ShroomContainer)

const Peach = ({ isBowserNear, shouldSaveMario }: PeachProps) => {
  const evento = useExpCreateEvento<PeachProps>()
  const handleClick = () => {
    if (isBowserNear && shouldSaveMario) {
      evento('saveMario', 'Yet again, I am rescuing Mario...')
    }
  }
  return (
    <>
      <button
        onClick={handleClick}
      >
        Save
      </button>
    </>
  )
}

const Bowser = (props: BowserProps) => {
  const evento = useExpCreateEvento<BowserProps>()
  const handleClick = () => evento('evaluateEveilness', `I am ${props.evilnessLevel} bad`)
  return <button onClick={handleClick}>Bowser</button>
}

const Koopa = (props: KoopaProps) => {
  const evento = useExpCreateEvento<KoopaProps>()
  return <button onClick={() => evento('run', props.speed)}>Turtle</button>
}

const Box = (props: BoxProps) => {
  const evento = useCreateEvento(props)

  return (
    <div className={`color-${props.color}`}>
      <button 
        onClick={
          () => evento('break', { shouldBreak: true })
            .then(res => res ? evento('releaseShroom') : null)
        }>
        ?
      </button>
    </div>
  )
}

const Yoshi = (props: YoshiProps) => {
  const evento = useCreateEvento(props)

  return (
    <div>
      <button
        onClick={e => evento('forwardedClick', e)}
      >
        Forward
      </button>
    </div>
  )
}

const App = () => {
  const [koopaSpeed, setKoopaSpeed] = React.useState<number>(Math.random())
  return (
    <div>
      <Level />
      <Peach 
        isBowserNear
        onSaveMario={(e) => console.log(e.detail)}
        shouldSaveMario
      />
      <Box 
        color="yellow"
        onBreak={e => console.log(e.detail.shouldBreak)}
        onReleaseShroom={() => console.log('shroom released')}
      />
      <Shroom
        onEatMe={e => console.log(e.detail)}
      />
      <Bowser 
        evilnessLevel='very'
        onEvaluateEveilness={e => console.log(e.detail)}
      />
      <Bowser 
        evilnessLevel='sooo'
        onEvaluateEveilness={e => console.log(e.detail)}
      />
      <Koopa
        onRun={e => console.log(`Koopa is runnig at ${e.detail} km/h`)}
        speed={koopaSpeed}
      />
      <button onClick={() => setKoopaSpeed(Math.random())}>
        change speed
      </button>
      <Yoshi onForwardedClick={e => console.log(e ? e.clientX : 'we don\'t know')} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
