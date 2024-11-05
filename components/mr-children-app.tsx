'use client'

import { useState, useRef, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { Music, History, Album, Mic, Star, TrendingUp, Moon, Sun, Play, Pause, ChevronRight } from 'lucide-react'
import { Sidebar, SidebarProvider, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'

// セクションの型定義を追加
interface Section {
  id: string;
  title: string;
  icon: JSX.Element;
}

// AppSidebarの型定義を追加
interface AppSidebarProps {
  sections: Section[];
  activeSection: string;
  setActiveSection: (id: string) => void;
  isDarkMode: boolean;
}

const sections = [
  { id: 'overview', title: 'バンド概要', icon: <Music className="w-6 h-6" /> },
  { id: 'history', title: '歴史', icon: <History className="w-6 h-6" /> },
  { id: 'songs', title: '代表曲とアルバム', icon: <Album className="w-6 h-6" /> },
  { id: 'style', title: '音楽スタイルの進化', icon: <TrendingUp className="w-6 h-6" /> },
  { id: 'lyrics', title: '桜井和寿の歌詞の魅力', icon: <Mic className="w-6 h-6" /> },
  { id: 'influence', title: 'Mr.Childrenの影響力', icon: <Star className="w-6 h-6" /> },
  { id: 'future', title: '今後の展望', icon: <TrendingUp className="w-6 h-6" /> },
]

export function MrChildrenAppComponent() {
  return (
    <SidebarProvider>
      <MrChildrenApp />
    </SidebarProvider>
  )
}

function MrChildrenApp() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  useEffect(() => {
    const audio = new Audio('/path-to-mr-children-sample.mp3')
    audioRef.current = audio
    audio.addEventListener('ended', () => setIsPlaying(false))
    return () => {
      audio.removeEventListener('ended', () => setIsPlaying(false))
      audio.pause()
    }
  }, [])

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="flex">
        <AppSidebar 
          sections={sections} 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
          isDarkMode={isDarkMode}
        />
        <main className="flex-1 p-8">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Mr.Children</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlayPause}
                className="p-2 rounded-full bg-pink-500 text-white hover:bg-pink-600 transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label={isDarkMode ? 'Light mode' : 'Dark mode'}
              >
                {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
              </button>
            </div>
          </header>
          <ContentSection section={activeSection} isDarkMode={isDarkMode} />
        </main>
      </div>
    </div>
  )
}

function AppSidebar({ sections, activeSection, setActiveSection, isDarkMode }: AppSidebarProps) {
  return (
    <Sidebar className={`w-64 h-screen ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <SidebarHeader className="p-4">
        <h2 className="text-xl font-bold">Mr.Children</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {sections.map((section) => (
            <SidebarMenuItem key={section.id}>
              <SidebarMenuButton
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-pink-500 text-white'
                    : isDarkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {section.icon}
                <span>{section.title}</span>
                {activeSection === section.id && <ChevronRight className="ml-auto" />}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

// ContentSectionの型定義を追加
interface ContentSectionProps {
  section: string;
  isDarkMode: boolean;
}

function ContentSection({ section, isDarkMode }: ContentSectionProps) {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    reset: true,
    key: section,
  })

  return (
    <animated.div style={fadeIn} className="space-y-4">
      {section === 'overview' && (
        <p className="leading-relaxed">
          Mr.Childrenは、1989年に結成された4人組ロックバンドです。桜井和寿（Vo/Gt）、田原健一（Gt）、中川敬輔（Ba）、鈴木英哉（Dr）のメンバーで構成されています。1992年のメジャーデビュー以来、幅広い世代に愛される国民的バンドとして、日本の音楽シーンに確固たる地位を築いてきました。
        </p>
      )}
      {section === 'history' && (
        <ul className="space-y-2">
          {[
            { year: 1992, event: 'ミニアルバム「EVERYTHING」でメジャーデビュー' },
            { year: 1993, event: 'シングル「CROSS ROAD」が大ヒット' },
            { year: 1994, event: 'アルバム「Atomic Heart」がトリプルミリオンを記録' },
            { year: '1997-1999', event: '一時的な活動休止期間' },
            { year: 2000, event: 'コンスタントに作品を発表し、精力的に活動' },
            { year: 2022, event: 'デビュー30周年' },
          ].map(({ year, event }) => (
            <li key={year} className="flex items-start">
              <span className={`font-semibold mr-2 ${isDarkMode ? 'text-pink-300' : 'text-pink-600'}`}>{year}:</span>
              <span>{event}</span>
            </li>
          ))}
        </ul>
      )}
      {section === 'songs' && (
        <div className="space-y-4">
          <div>
            <h3 className={`font-semibold mb-2 text-lg ${isDarkMode ? 'text-pink-300' : 'text-pink-600'}`}>代表曲:</h3>
            <p>「innocent world」「Tomorrow never knows」「名もなき詩」「Sign」「himawari」など</p>
          </div>
          <div>
            <h3 className={`font-semibold mb-2 text-lg ${isDarkMode ? 'text-pink-300' : 'text-pink-600'}`}>主要アルバム:</h3>
            <p>「EVERYTHING」(1992)、「Atomic Heart」(1994)、「深海」(1996)、「BOLERO」(1997)、「DISCOVERY」(1999)、「Q」(2000)など</p>
          </div>
          <div>
            <h3 className={`font-semibold mb-2 text-lg ${isDarkMode ? 'text-pink-300' : 'text-pink-600'}`}>最新作:</h3>
            <p>2023年にアルバム「miss you」をリリース</p>
          </div>
        </div>
      )}
      {section === 'style' && (
        <ul className="space-y-2">
          {[
            { period: '初期', style: 'ストレートなロックサウンドが中心' },
            { period: '中期', style: '様々な音楽要素を取り入れ、より深みのある音楽性を確立' },
            { period: '後期', style: 'エレクトロニカなど、さらに多様なジャンルを取り入れ、円熟味を増した深みのあるサウンドを確立' },
          ].map(({ period, style }) => (
            <li key={period} className="flex items-start">
              <span className={`font-semibold mr-2 ${isDarkMode ? 'text-pink-300' : 'text-pink-600'}`}>{period}:</span>
              <span>{style}</span>
            </li>
          ))}
        </ul>
      )}
      {section === 'lyrics' && (
        <ul className="space-y-2">
          {[
            { aspect: '普遍的テーマ', description: '青春時代の葛藤や恋愛の喜び、人生における様々な苦悩や希望' },
            { aspect: '繊細な表現', description: '人間の複雑な感情を繊細に描き出す' },
            { aspect: '深い洞察', description: '人生における様々なテーマに深い洞察を加える' },
            { aspect: '時代を超えた共感', description: '多くの人々の心に響き続ける力' },
          ].map(({ aspect, description }) => (
            <li key={aspect} className="flex items-start">
              <span className={`font-semibold mr-2 ${isDarkMode ? 'text-pink-300' : 'text-pink-600'}`}>{aspect}:</span>
              <span>{description}</span>
            </li>
          ))}
        </ul>
      )}
      {section === 'influence' && (
        <ul className="space-y-2">
          {[
            { aspect: '音楽シーンへの影響', description: '多くのアーティストに影響を与え、新たな潮流を生み出す' },
            { aspect: '後進の育成', description: '新たな才能の育成に貢献' },
            { aspect: 'ファンへの影響', description: '多くのファンの人生に寄り添い、励ましや慰めを与え続ける' },
            { aspect: '音楽界のリーダー', description: '日本の音楽界を牽引する存在としての地位を確立' },
          ].map(({ aspect, description }) => (
            <li key={aspect} className="flex items-start">
              <span className={`font-semibold mr-2 ${isDarkMode ? 'text-pink-300' : 'text-pink-600'}`}>{aspect}:</span>
              <span>{description}</span>
            </li>
          ))}
        </ul>
      )}
      {section === 'future' && (
        <p className="leading-relaxed">
          Mr.Childrenは、デビュー30周年を迎え、日本の音楽シーンを代表するバンドとしての存在感をさらに増しています。2023年にリリースされたアルバム「miss you」では、コロナ禍における人々の感情や社会の変化をテーマにした新たな一面を見せ、常に進化し続ける姿勢を示しています。今後も日本の音楽界を牽引していく存在として、さらなる活躍が期待されています。
        </p>
      )}
    </animated.div>
  )
}