import { useState } from 'react'
import {
  Map,
  ChevronRight,
  HelpCircle,
  Heart,
  PhoneIncoming,
  PhoneOff,
  Image,
  Compass,
  Clock,
  MapPin,
  CheckCircle,
  Terminal,
  Radio,
  Fingerprint,
} from 'lucide-react'

const PLAYER_NAME_TOKEN = '__PLAYER_NAME__'

const puzzles = [
  {
    id: 1,
    zone: '吉田観賞魚',
    title: '水面の導入コード',
    description: '水槽に映る「1, 2, 3」の順番で見える漢字をつなげよ。',
    hint: '水・丘・門 の順で読む。',
    answer: 'みずのおかもん',
    color: 'from-amber-100 to-yellow-50',
  },
  {
    id: 2,
    zone: '吉田観賞魚',
    title: '鱗の暗号',
    description: '青い札の裏面にある4文字を逆から読むと？',
    hint: '逆読みで「ろぐ」。',
    answer: 'ろぐ',
    color: 'from-sky-100 to-cyan-50',
  },
  {
    id: 3,
    zone: 'GGガーデンズ',
    title: '芽吹きの座標',
    description: '花壇番号「2-0-4-6」が示す花の頭文字を並べよ。',
    hint: '未来年号と同じ数字。',
    answer: 'みらい',
    color: 'from-emerald-100 to-lime-50',
  },
  {
    id: 4,
    zone: 'GGガーデンズ',
    title: '風の方位盤',
    description: '北→東→南→西の順にある文字を拾うと？',
    hint: '「ひ」「ほ」「う」で3文字。',
    answer: 'ひほう',
    color: 'from-green-100 to-emerald-50',
  },
  {
    id: 5,
    zone: 'マルシェ',
    title: '市場の伝票',
    description: '品名欄の赤字だけを読むと現れる言葉は？',
    hint: '「とびら」に関係する。',
    answer: 'かぎ',
    color: 'from-orange-100 to-amber-50',
  },
  {
    id: 6,
    zone: 'マルシェ',
    title: '香りの順列',
    description: 'ハーブの頭文字を A→Z 順に並べ替えよ。',
    hint: '最初と最後は「ら」と「る」。',
    answer: 'らべる',
    color: 'from-rose-100 to-orange-50',
  },
  {
    id: 7,
    zone: 'Au coju',
    title: '温室の反響',
    description: '壁の言葉「ミライノキオク」を2文字ずつ区切ると？',
    hint: '最後の2文字に注目。',
    answer: 'きおく',
    color: 'from-indigo-100 to-blue-50',
  },
  {
    id: 8,
    zone: 'Au coju',
    title: '夜明けの封印',
    description: '暗号「4-1-2-1」を五十音表で読む。',
    hint: '答えは「あさ」。',
    answer: 'あさ',
    color: 'from-violet-100 to-purple-50',
  },
  {
    id: 9,
    zone: '最終ナビ',
    title: '最後の道標',
    description: '4つのゾーン名の頭文字を拾うと導かれる単語は？',
    hint: '「よ・じ・ま・あ」ではなく、ローマ字頭文字。',
    answer: 'ygma',
    color: 'from-stone-100 to-zinc-50',
  },
  {
    id: 10,
    zone: '最終地点',
    title: '未来認証キー',
    description: '未来のあなたを認証せよ。入力すべき答えは？',
    hint: 'プロローグで登録した名前。',
    answer: PLAYER_NAME_TOKEN,
    color: 'from-emerald-100 to-cyan-50',
  },
]

const zones = ['吉田観賞魚', 'GGガーデンズ', 'マルシェ', 'Au coju', '最終地点']
const DECLINE_MESSAGE = '通信を終了すると特典を受け取れません。'

const normalize = (value) => value.normalize('NFKC').trim().replace(/\s+/g, '').toLowerCase()

function App() {
  const [screen, setScreen] = useState('prologue')
  const [prologueStep, setPrologueStep] = useState(0)
  const [playerName, setPlayerName] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answerInput, setAnswerInput] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState('')

  const puzzle = puzzles[currentIndex]

  const nextPrologue = () => {
    if (prologueStep < 2) {
      setPrologueStep((prev) => prev + 1)
    }
  }

  const registerName = (event) => {
    event.preventDefault()
    const value = nameInput.trim()
    if (!value) {
      return
    }
    setPlayerName(value)
    setScreen('map')
  }

  const submitAnswer = (event) => {
    event.preventDefault()
    const entered = normalize(answerInput)
    const expected =
      puzzle.answer === PLAYER_NAME_TOKEN ? normalize(playerName) : normalize(puzzle.answer)

    if (entered && entered === expected) {
      setFeedback('認証成功。次のログへ進みます。')
      setAnswerInput('')
      setShowHint(false)

      if (puzzle.id === 10) {
        setScreen('call')
        return
      }

      setCurrentIndex((prev) => prev + 1)
      setScreen('map')
      return
    }

    setFeedback('認証失敗。入力を確認してください。')
  }

  if (screen === 'prologue') {
    return (
      <main className="min-h-screen bg-black text-green-200">
        <section className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center p-6 md:p-10">
          <div className="rounded-2xl border border-green-500/40 bg-black/70 p-8 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
            {prologueStep === 0 && (
              <>
                <div className="mb-4 flex items-center gap-3 text-red-400">
                  <Radio className="h-5 w-5 animate-pulse" />
                  <Terminal className="h-5 w-5" />
                  <p className="font-mono text-sm tracking-widest">UNKNOWN TRANSMISSION DETECTED</p>
                </div>
                <h1 className="mb-4 text-3xl font-bold text-red-300 md:text-4xl">⚠ 通信干渉 / WARNING ⚠</h1>
                <p className="font-mono leading-relaxed text-green-200/90 [text-shadow:0_0_8px_rgba(34,197,94,0.5)]">
                  011010... WATER HILL GARDEN ... 2046 ... SIGNAL UNSTABLE ...
                </p>
              </>
            )}

            {prologueStep === 1 && (
              <>
                <div className="mb-4 flex items-center gap-3 text-cyan-300">
                  <PhoneIncoming className="h-5 w-5" />
                  <Clock className="h-5 w-5" />
                  <p className="font-mono text-sm tracking-widest">FROM 2046 / EMERGENCY LOG</p>
                </div>
                <h1 className="mb-4 text-3xl font-bold md:text-4xl">未来のあなたからのSOS</h1>
                <p className="leading-relaxed text-green-100/90">
                  「水の丘の秘宝」が失われると、未来の記録が崩壊する。
                  10個のログを回収し、最後に“あなた自身”で認証してほしい。時間は残りわずかだ。
                </p>
              </>
            )}

            {prologueStep === 2 && (
              <>
                <div className="mb-4 flex items-center gap-3 text-emerald-300">
                  <Fingerprint className="h-5 w-5" />
                  <p className="font-mono text-sm tracking-widest">BIOMETRIC AUTH REQUIRED</p>
                </div>
                <h1 className="mb-4 text-3xl font-bold md:text-4xl">生体認証を開始</h1>
                <form onSubmit={registerName} className="space-y-4">
                  <label htmlFor="name" className="block text-sm text-green-100/90">
                    プレイヤー名
                  </label>
                  <input
                    id="name"
                    value={nameInput}
                    onChange={(event) => setNameInput(event.target.value)}
                    className="w-full rounded-lg border border-emerald-400/50 bg-black/60 p-3 text-white outline-none ring-0 placeholder:text-slate-400 focus:border-emerald-300"
                    placeholder="例: 水野ミライ"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-black hover:bg-emerald-400"
                  >
                    認証して出発 <ChevronRight className="h-4 w-4" />
                  </button>
                </form>
              </>
            )}

            {prologueStep < 2 && (
              <button
                onClick={nextPrologue}
                className="mt-8 inline-flex items-center gap-2 rounded-lg border border-green-500/50 bg-green-900/20 px-4 py-2 text-sm font-semibold hover:bg-green-900/40"
              >
                次へ <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </section>
      </main>
    )
  }

  if (!puzzle) {
    return null
  }

  if (screen === 'map') {
    const currentZone = puzzle.zone
    const currentZoneIndex = zones.indexOf(currentZone)

    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#f8edd2,#ead7ad_40%,#d0b98a)] p-6 text-amber-950">
        <section className="mx-auto w-full max-w-4xl rounded-3xl border-2 border-amber-900/30 bg-amber-50/80 p-6 shadow-xl md:p-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h1 className="flex items-center gap-2 text-3xl font-bold md:text-4xl">
              <Map className="h-7 w-7" /> 水の丘の探索地図
            </h1>
            <p className="rounded-full border border-amber-900/20 bg-white/70 px-4 py-1 text-sm font-semibold">
              進行度: {currentIndex + 1} / 10
            </p>
          </div>

          <div className="mb-6 rounded-2xl border-2 border-amber-900/30 bg-amber-100/80 p-5 shadow">
            <p className="text-sm font-semibold text-amber-900/80">次の目的地</p>
            <p className="mt-2 text-3xl font-extrabold md:text-4xl">{puzzle.zone}</p>
          </div>

          <div className="mb-6 grid gap-3 md:grid-cols-2">
            {zones.map((zone, index) => (
              <article
                key={zone}
                className={`rounded-xl border p-4 ${
                  index < currentZoneIndex
                    ? 'border-emerald-700/30 bg-emerald-100/80'
                    : index === currentZoneIndex
                      ? 'border-amber-900/40 bg-yellow-100/90'
                      : 'border-amber-900/10 bg-white/40 opacity-60'
                }`}
              >
                <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
                  <Compass className="h-4 w-4" />
                  SPOT {index + 1}
                </p>
                <h2 className="flex items-center gap-2 text-xl font-bold">
                  <MapPin className="h-5 w-5" /> {zone}
                </h2>
                <p className="mt-2 text-sm font-semibold">
                  {index < currentZoneIndex ? '✅ 完了' : index === currentZoneIndex ? '🔴 現在地' : '未到達'}
                </p>
              </article>
            ))}
          </div>

          <p className="mb-6 flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4" />
            プレイヤー「{playerName}」で認証済み。ログ回収を開始してください。
          </p>

          <button
            onClick={() => setScreen('play')}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-900 px-6 py-4 text-lg font-bold text-amber-50 hover:bg-amber-800"
          >
            現地に到着した（謎を解く） <ChevronRight className="h-5 w-5" />
          </button>
        </section>
      </main>
    )
  }

  if (screen === 'call') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-slate-100">
        <section className="w-full max-w-md rounded-3xl border border-slate-700 bg-slate-900/80 p-8 text-center shadow-2xl">
          <p className="mb-2 text-sm text-slate-400">ビデオ通話</p>
          <h1 className="mb-6 text-3xl font-bold">未来のあなたから着信</h1>
          <div className="mb-8 rounded-2xl bg-slate-800 p-6">
            <PhoneIncoming className="mx-auto mb-3 h-10 w-10 animate-pulse text-emerald-400" />
            <p>「全ログ確認。最後の通話を受けてください。」</p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setScreen('ending')}
              className="rounded-full bg-emerald-500 p-4 text-black hover:bg-emerald-400"
              aria-label="着信に応答"
            >
              <PhoneIncoming className="h-5 w-5" />
            </button>
            <button
              onClick={() => setFeedback(DECLINE_MESSAGE)}
              className="rounded-full bg-rose-500 p-4 text-white hover:bg-rose-400"
              aria-label="着信を拒否"
            >
              <PhoneOff className="h-5 w-5" />
            </button>
          </div>
          {feedback && <p className="mt-4 text-sm text-amber-300">{feedback}</p>}
        </section>
      </main>
    )
  }

  if (screen === 'ending') {
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black p-6 text-slate-100">
        <section className="mx-auto w-full max-w-3xl rounded-3xl border border-slate-600 bg-slate-900/70 p-8 shadow-2xl">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl">エンディング / 2046 LOG COMPLETE</h1>
          <p className="mb-6 leading-relaxed text-slate-200">
            {playerName}へ。時空の揺らぎを止めてくれてありがとう。あなたが集めた10個のログは、
            Water Hill Garden の未来を守る鍵になった。
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-600 bg-slate-800/80 p-4">
              <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                <Image className="h-5 w-5" /> クリア特典1
              </h2>
              <p>デジタル写真フレーム: WHG-2046-LENS</p>
            </article>
            <article className="rounded-2xl border border-slate-600 bg-slate-800/80 p-4">
              <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                <Heart className="h-5 w-5 text-rose-400" /> クリア特典2
              </h2>
              <p>引換コード: MIZU-NO-OKA-2046</p>
            </article>
          </div>
        </section>
      </main>
    )
  }

  if (screen === 'play') {
    return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#f8edd2,#ead7ad_40%,#d0b98a)] p-6 text-amber-950">
      <section className={`mx-auto w-full max-w-4xl rounded-3xl border-2 border-amber-900/30 bg-gradient-to-br ${puzzle.color} p-6 shadow-xl md:p-10`}>
        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold">{puzzle.zone}</p>
          <p className="rounded-full border border-amber-900/20 bg-white/70 px-3 py-1 text-xs font-semibold">
            問題 {puzzle.id} / 10
          </p>
        </div>

        <h1 className="mb-2 text-3xl font-bold md:text-4xl">{puzzle.title}</h1>
        <p className="mb-6 leading-relaxed">{puzzle.description}</p>

        <form onSubmit={submitAnswer} className="space-y-3">
          <input
            value={answerInput}
            onChange={(event) => setAnswerInput(event.target.value)}
            className="w-full rounded-xl border border-amber-900/30 bg-white/80 p-3 outline-none focus:border-amber-700"
            placeholder="答えを入力してください"
          />
          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-amber-900 px-4 py-2 font-semibold text-amber-50 hover:bg-amber-800"
            >
              回答する <ChevronRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setShowHint((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-xl border border-amber-900/30 bg-white/70 px-4 py-2 font-semibold"
            >
              <HelpCircle className="h-4 w-4" /> ヒント
            </button>
          </div>
        </form>

        {showHint && (
          <p className="mt-4 rounded-xl border border-amber-900/20 bg-white/60 p-3 text-sm">
            ヒント: {puzzle.hint}
          </p>
        )}

        {feedback && (
          <p className="mt-4 rounded-xl border border-amber-900/20 bg-white/60 p-3 text-sm">{feedback}</p>
        )}
      </section>
    </main>
    )
  }

  return null
}

export default App
