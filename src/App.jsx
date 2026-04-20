import { useState } from 'react'
import {
  Map,
  ChevronRight,
  HelpCircle,
  Heart,
  PhoneIncoming,
  PhoneOff,
  Image,
  Clock,
  MapPin,
  CheckCircle,
  Terminal,
  Radio,
  Fingerprint,
} from 'lucide-react'

const PLAYER_NAME_TOKEN = 'USER_NAME'

const PUZZLES = [
  {
    id: 1,
    zone: 'Zone A: 吉田観賞魚',
    title: '第一の鍵：創業の刻印',
    description:
      '吉田観賞魚の歴史を紐解こう。大正時代、初代・吉田定一が養殖場を開業した年は西暦何年？数字4桁で答えよ。',
    hint: '歴史を示す古い看板や写真を探してみて。大正10年は西暦『1921』年だ。',
    answer: '1921',
    color: 'text-blue-600 border-blue-200',
  },
  {
    id: 2,
    zone: 'Zone A: 吉田観賞魚',
    title: '第二の鍵：泳ぐ宝石',
    description:
      '池の中で優雅に泳ぐ『錦鯉』。その中で、白地に赤い模様がある代表的な品種をカタカナ4文字で何と呼ぶ？',
    hint: 'おめでたい色の組み合わせ。コから始まる4文字だよ。',
    answer: 'コウハク',
    color: 'text-blue-600 border-blue-200',
  },
  {
    id: 3,
    zone: 'Zone B: GGガーデンズ',
    title: '第三の鍵：緑の迷宮',
    description:
      '温室へ進もう。植物に添えられた名札に注目。四つ葉のクローバーのマークがある名札の植物は何色？カタカナ3文字で答えよ。',
    hint: '植物を象徴する色だよ。ミ・ド・リ。',
    answer: 'ミドリ',
    color: 'text-green-600 border-green-200',
  },
  {
    id: 4,
    zone: 'Zone B: GGガーデンズ',
    title: '第四の鍵：時の歯車',
    description:
      'アンティーク家具が並ぶエリアで、一番大きな時計を探せ。その時計の短針が『3』を指している時、その方向にある花の名前は？カタカナ2文字。',
    hint: '愛の象徴とされる、トゲのある美しい花だよ。',
    answer: 'バラ',
    color: 'text-green-600 border-green-200',
  },
  {
    id: 5,
    zone: 'Zone C: Gardens Marché',
    title: '第五の鍵：大地のパレット',
    description:
      '地元八王子の恵みが集まるマルシェ。今日並んでいる野菜の中で、真っ赤で丸いサラダの定番野菜は？カタカナ3文字で答えよ。',
    hint: 'トから始まる3文字の野菜だよ。',
    answer: 'トマト',
    color: 'text-yellow-600 border-yellow-200',
  },
  {
    id: 6,
    zone: 'Zone C: Gardens Marché',
    title: '第六の鍵：黄金の収穫',
    description: 'マルシェのロゴマークをよく見てみよう。何の形をモチーフにしている？漢字一文字で答えよ。',
    hint: 'コーヒー〇〇、大豆、などと言う時の漢字だよ。',
    answer: '豆',
    color: 'text-yellow-600 border-yellow-200',
  },
  {
    id: 7,
    zone: 'Zone D: Au coju',
    title: '第七の鍵：休息の暗号',
    description:
      'レストラン『Au coju』へ。この名前の由来は、多摩の方言で「一休み」を意味する言葉。ひらがな4文字で何と読む？',
    hint: 'そのまま『おこじゅ』と入力して。',
    answer: 'おこじゅ',
    color: 'text-purple-600 border-purple-200',
  },
  {
    id: 8,
    zone: 'Zone D: Au coju',
    title: '第八の鍵：未来への椅子',
    description:
      'オコジュのメニューを開いて。一番最初に載っている、香り高い黒い飲み物は？カタカナ4文字で答えよ。',
    hint: '眠気覚ましによく飲むアレだよ。',
    answer: 'コーヒー',
    color: 'text-purple-600 border-purple-200',
  },
  {
    id: 9,
    zone: '最終地点: 水の丘',
    title: '第九の鍵：秘宝の封印',
    description: 'ここまで集めた記憶をたどろう。この場所全体を『〇〇の丘』と呼ぶ。〇〇に入る漢字一文字は？',
    hint: '水と緑に囲まれた場所。『Water』を日本語の漢字にして。',
    answer: '水',
    color: 'text-stone-600 border-stone-200',
  },
  {
    id: 10,
    zone: '2046年からの通信',
    title: '真実の鍵',
    description:
      '全ての欠片が集まった。時を動かす最後の鍵、それはこの冒険を始めた『あなたの名前』だ。入力して封印を解け。',
    hint: 'ゲームの最初に登録した名前を正確に入力して。全角・半角の違いは自動で修正されるよ。',
    answer: PLAYER_NAME_TOKEN,
    color: 'text-red-600 border-red-200',
  },
]

const zones = [
  'Zone A: 吉田観賞魚',
  'Zone B: GGガーデンズ',
  'Zone C: Gardens Marché',
  'Zone D: Au coju',
  '最終地点: 水の丘',
]
const ZONE_COORDS = {
  'Zone A: 吉田観賞魚': { top: '30%', left: '25%' },
  'Zone B: GGガーデンズ': { top: '20%', left: '65%' },
  'Zone C: Gardens Marché': { top: '70%', left: '70%' },
  'Zone D: Au coju': { top: '70%', left: '25%' },
  '最終地点: 水の丘': { top: '50%', left: '50%' },
}
const ENTRANCE_COORDS = [
  { top: '10%', left: '22%' },
  { top: '10%', left: '50%' },
  { top: '10%', left: '78%' },
]
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

  const puzzle = PUZZLES[currentIndex]

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
    const currentZone = puzzle.zone === '2046年からの通信' ? '最終地点: 水の丘' : puzzle.zone
    const isZoneCompleted = (zone) => {
      const completeThresholdByZone = {
        'Zone A: 吉田観賞魚': 2,
        'Zone B: GGガーデンズ': 4,
        'Zone C: Gardens Marché': 6,
        'Zone D: Au coju': 8,
        '最終地点: 水の丘': 9,
      }

      const threshold = completeThresholdByZone[zone]
      return typeof threshold === 'number' && currentIndex >= threshold
    }

    return (
      <main className="relative min-h-screen overflow-hidden text-amber-950">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/bg-map.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'sepia(0.6) brightness(0.9)',
          }}
        />
        <div className="absolute inset-0 bg-black/25" />

        <div className="relative z-10 flex min-h-screen flex-col">
          <section className="bg-black/50 p-4 text-white backdrop-blur-sm">
            <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3">
              <h1 className="flex items-center gap-2 text-2xl font-bold md:text-3xl">
                <Map className="h-7 w-7" /> Water Hill Garden
              </h1>
              <div className="rounded-xl border border-white/30 bg-black/30 px-4 py-1 text-sm font-semibold leading-relaxed">
                <p>プレイヤー: {playerName}</p>
                <p>進行度: {currentIndex + 1} / 10</p>
              </div>
            </div>
          </section>

          <section className="bg-black/30 p-4 text-center text-white">
            <p className="text-sm font-semibold text-amber-100">次の目的地</p>
            <h2 className="mt-1 text-3xl font-extrabold md:text-4xl">{puzzle.zone}</h2>
            <p className="mt-1 text-xs text-amber-100/90">問題 {puzzle.id} / 10</p>
          </section>

          <div className="relative mx-auto w-full max-w-5xl flex-1 p-4">
            <div className="relative min-h-[420px] rounded-2xl border border-amber-100/50 bg-black/10">
              {ENTRANCE_COORDS.map((coords, index) => (
                <div
                  key={`entrance-${index}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded bg-black/45 px-2 py-1 text-[10px] font-bold tracking-wide text-white/90 md:text-xs"
                  style={{ top: coords.top, left: coords.left }}
                >
                  ENTRANCE
                </div>
              ))}
              {zones
                .filter((zone) => ZONE_COORDS[zone])
                .map((zone) => {
                  const isCurrent = zone === currentZone
                  const isCompleted = !isCurrent && isZoneCompleted(zone)
                  const coords = ZONE_COORDS[zone]

                  return (
                    <div
                      key={zone}
                      className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
                      style={{ top: coords.top, left: coords.left }}
                    >
                      {isCurrent ? (
                        <div className="animate-bounce">
                          <MapPin className="mx-auto h-9 w-9 text-red-500 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]" />
                          <p className="mt-1 rounded bg-white/80 px-2 py-1 text-xs font-bold text-red-700 md:text-sm">
                            {zone}
                          </p>
                        </div>
                      ) : (
                        <div className={`text-xs font-semibold ${isCompleted ? 'text-green-100 opacity-70' : 'text-gray-100 opacity-50'}`}>
                          <p className="text-lg">{isCompleted ? '✅' : '•'}</p>
                          <p className="rounded bg-black/45 px-2 py-1 text-[11px] md:text-xs">
                            {zone}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
          </div>

          <div className="sticky bottom-0 mt-auto bg-black/55 p-4 backdrop-blur-sm">
            <div className="mx-auto w-full max-w-5xl">
              <p className="mb-3 flex items-center gap-2 text-sm text-white/90">
                <CheckCircle className="h-4 w-4" />
                プレイヤー「{playerName}」で認証済み。ログ回収を開始してください。
              </p>
              <button
                onClick={() => setScreen('play')}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-6 py-4 text-xl font-bold text-white hover:from-red-700 hover:to-red-800"
              >
                🎯 現地に到着した（謎を解く） <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
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
      <section className={`mx-auto w-full max-w-4xl rounded-3xl border-2 bg-white/90 ${puzzle.color} p-6 shadow-xl md:p-10`}>
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
