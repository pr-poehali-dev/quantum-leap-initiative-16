import { useState } from "react"
import { ThemedCountdown } from "./themed-countdown"
import { ThemeSwitcher } from "./theme-switcher"
import { useTheme } from "./theme-context"
import { themes, type ThemeMode } from "@/lib/themes"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Bell, Sparkles, Zap, Shield, Star } from "lucide-react"
import Icon from "@/components/ui/icon"

export function LandingPage() {
  const { theme } = useTheme()
  const themeConfig = themes[theme]

  const [targetDate, setTargetDate] = useState<Date>(() => {
    const date = new Date()
    date.setDate(date.getDate() + 7)
    return date
  })

  const [days, setDays] = useState("7")
  const [hours, setHours] = useState("0")
  const [minutes, setMinutes] = useState("0")
  const [seconds, setSeconds] = useState("0")
  const [email, setEmail] = useState("")
  const [showSettings, setShowSettings] = useState(false)
  const [activeSection, setActiveSection] = useState(0)

  const handleSetTimer = () => {
    const newTarget = new Date()
    newTarget.setDate(newTarget.getDate() + Number.parseInt(days || "0"))
    newTarget.setHours(newTarget.getHours() + Number.parseInt(hours || "0"))
    newTarget.setMinutes(newTarget.getMinutes() + Number.parseInt(minutes || "0"))
    newTarget.setSeconds(newTarget.getSeconds() + Number.parseInt(seconds || "0"))
    setTargetDate(newTarget)
    setShowSettings(false)
  }

  // Theme-specific content
  const content: Record<
    ThemeMode,
    {
      badge: string
      title: string
      highlight: string
      subtitle: string
      cta: string
      features: { icon: typeof Sparkles; text: string }[]
    }
  > = {
    "minimal-light": {
      badge: "Скоро открытие",
      title: "Первая помощь —",
      highlight: "дорога к спасению",
      subtitle:
        "Площадка, где люди делятся реальным опытом организации первой помощи. Вместе мы спасаем больше жизней.",
      cta: "Узнать первым об открытии",
      features: [
        { icon: Sparkles, text: "Реальный опыт" },
        { icon: Zap, text: "Быстрый доступ" },
        { icon: Shield, text: "Проверено" },
      ],
    },
    dark: {
      badge: "Скоро открытие",
      title: "Первая помощь —",
      highlight: "дорога к спасению",
      subtitle: "Площадка для обмена опытом организации первой помощи. Каждая история может спасти чью-то жизнь.",
      cta: "Присоединиться к сообществу",
      features: [
        { icon: Sparkles, text: "Сообщество" },
        { icon: Zap, text: "Реальные случаи" },
        { icon: Shield, text: "Достоверно" },
      ],
    },
    retro: {
      badge: "Скоро открытие",
      title: "Первая помощь —",
      highlight: "дорога к спасению",
      subtitle: "Форум, где каждый может поделиться опытом и узнать, как действовать в критической ситуации.",
      cta: "Занять место в сообществе",
      features: [
        { icon: Sparkles, text: "Живые истории" },
        { icon: Zap, text: "Советы экспертов" },
        { icon: Shield, text: "Надежность" },
      ],
    },
    neon: {
      badge: "[ СКОРО ЗАПУСК ]",
      title: "ПЕРВАЯ ПОМОЩЬ —",
      highlight: "СПАСИ ЖИЗНЬ",
      subtitle: "Платформа для обмена опытом в критических ситуациях. Знания, которые спасают жизни.",
      cta: "ВСТУПИТЬ В СООБЩЕСТВО",
      features: [
        { icon: Sparkles, text: "РЕАЛЬНЫЙ ОПЫТ" },
        { icon: Zap, text: "БЫСТРЫЕ СОВЕТЫ" },
        { icon: Shield, text: "ПРОВЕРЕНО" },
      ],
    },
    monochrome: {
      badge: "Скоро открытие",
      title: "Первая помощь —",
      highlight: "дорога к спасению",
      subtitle: "Площадка для обмена опытом организации первой помощи. Каждая история имеет значение.",
      cta: "Получить уведомление",
      features: [
        { icon: Sparkles, text: "Опыт участников" },
        { icon: Zap, text: "Актуально" },
        { icon: Shield, text: "Достоверно" },
      ],
    },
    glass: {
      badge: "Скоро открытие",
      title: "Первая помощь —",
      highlight: "дорога к спасению",
      subtitle: "Пространство, где реальный опыт становится знанием, а знание — спасёнными жизнями.",
      cta: "Присоединиться",
      features: [
        { icon: Sparkles, text: "Сообщество" },
        { icon: Zap, text: "Практично" },
        { icon: Shield, text: "Безопасно" },
      ],
    },
    terminal: {
      badge: "> status: coming_soon",
      title: "$ forum",
      highlight: "first_aid",
      subtitle: "// платформа обмена опытом первой помощи. ожидайте открытия...",
      cta: "$ subscribe --notify",
      features: [
        { icon: Sparkles, text: "--real-cases" },
        { icon: Zap, text: "--expert-tips" },
        { icon: Shield, text: "--verified" },
      ],
    },
    luxury: {
      badge: "Эксклюзивный запуск",
      title: "Первая помощь —",
      highlight: "дорога к спасению",
      subtitle:
        "Элитное сообщество профессионалов, объединённых одной миссией — сделать первую помощь доступным знанием для всех.",
      cta: "Запросить приглашение",
      features: [
        { icon: Sparkles, text: "Экспертиза" },
        { icon: Zap, text: "Уникально" },
        { icon: Shield, text: "Проверено" },
      ],
    },
  }

  const currentContent = content[theme]

  return (
    <div
      className={cn(
        "min-h-screen flex flex-col transition-all duration-500 relative overflow-hidden",
        themeConfig.background,
      )}
    >
      {/* Subtle background decoration */}
      {theme === "neon" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
      )}
      {theme === "glass" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-indigo-300/30 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-pink-300/30 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
      )}
      {theme === "luxury" && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 w-[800px] h-[400px] bg-gradient-to-r from-amber-500/5 via-yellow-500/10 to-amber-500/5 rounded-full blur-3xl -translate-x-1/2" />
        </div>
      )}

      {/* Header with Theme Switcher */}
      <header className="relative z-50 w-full">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center text-center justify-center">
          <ThemeSwitcher />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-12 relative z-10">
        <div className="max-w-4xl w-full flex flex-col items-center gap-6 sm:gap-10">
          {/* Badge */}
          <div
            className={cn(
              "inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border transition-all",
              themeConfig.muted,
              themeConfig.border,
              themeConfig.mutedForeground,
              themeConfig.fontClass,
              theme === "neon" && "shadow-[0_0_15px_rgba(34,211,238,0.3)] border-cyan-500/50",
              theme === "luxury" && "border-amber-500/30",
            )}
          >
            <Bell className="w-3 h-3 sm:w-4 sm:h-4" />
            {currentContent.badge}
          </div>

          {/* Main Headline */}
          <div className="text-center space-y-3 sm:space-y-4">
            <h1
              className={cn(
                "text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-balance leading-[1.1]",
                themeConfig.foreground,
                themeConfig.fontClass,
              )}
            >
              {currentContent.title}{" "}
              <span
                className={cn(
                  "relative inline-block",
                  theme === "neon" && "text-cyan-400 [text-shadow:0_0_40px_rgba(34,211,238,0.6)]",
                  theme === "luxury" &&
                    "bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent",
                  theme === "glass" && "bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent",
                  theme === "retro" && "text-amber-700",
                  theme === "terminal" && "text-green-300",
                  (theme === "minimal-light" || theme === "monochrome" || theme === "dark") && themeConfig.foreground,
                )}
              >
                {currentContent.highlight}
              </span>
            </h1>
            <p
              className={cn(
                "text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-pretty leading-relaxed px-2 sm:px-0",
                themeConfig.mutedForeground,
                themeConfig.fontClass,
              )}
            >
              {currentContent.subtitle}
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="w-full flex flex-col items-center gap-2 sm:gap-3">
            <p
              className={cn(
                "text-xs sm:text-sm uppercase tracking-widest",
                themeConfig.mutedForeground,
                themeConfig.fontClass,
              )}
            >
              {theme === "terminal" ? "// time_remaining:" : "До открытия форума"}
            </p>
            <ThemedCountdown targetDate={targetDate} />
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={cn(
                "text-xs underline-offset-4 hover:underline transition-all",
                themeConfig.mutedForeground,
                themeConfig.fontClass,
              )}
            >
              {theme === "terminal" ? "// modify_timer" : "Настроить таймер"}
            </button>
          </div>

          {/* Timer Settings (Collapsible) */}
          {showSettings && (
            <div
              className={cn(
                "flex flex-col items-center gap-3 sm:gap-4 p-4 sm:p-6 rounded-2xl border transition-all duration-500 animate-in fade-in slide-in-from-top-2 w-full sm:w-auto",
                themeConfig.muted,
                themeConfig.border,
                theme === "neon" && "shadow-[0_0_30px_rgba(34,211,238,0.15)]",
                theme === "glass" && "backdrop-blur-xl bg-white/40",
              )}
            >
              <div className="grid grid-cols-4 gap-2 sm:flex sm:items-end sm:gap-3 sm:flex-wrap sm:justify-center w-full sm:w-auto">
                <div className="flex flex-col gap-1 sm:gap-1.5">
                  <Label htmlFor="days" className={cn("text-[10px] sm:text-xs", themeConfig.mutedForeground)}>
                    Дни
                  </Label>
                  <Input
                    id="days"
                    type="number"
                    min="0"
                    max="99"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className={cn(
                      "w-full sm:w-16 text-center text-sm",
                      themeConfig.card,
                      themeConfig.cardForeground,
                      themeConfig.border,
                      themeConfig.fontClass,
                    )}
                  />
                </div>
                <div className="flex flex-col gap-1 sm:gap-1.5">
                  <Label htmlFor="hours" className={cn("text-[10px] sm:text-xs", themeConfig.mutedForeground)}>
                    Часы
                  </Label>
                  <Input
                    id="hours"
                    type="number"
                    min="0"
                    max="23"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    className={cn(
                      "w-full sm:w-16 text-center text-sm",
                      themeConfig.card,
                      themeConfig.cardForeground,
                      themeConfig.border,
                      themeConfig.fontClass,
                    )}
                  />
                </div>
                <div className="flex flex-col gap-1 sm:gap-1.5">
                  <Label htmlFor="minutes" className={cn("text-[10px] sm:text-xs", themeConfig.mutedForeground)}>
                    Мин
                  </Label>
                  <Input
                    id="minutes"
                    type="number"
                    min="0"
                    max="59"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    className={cn(
                      "w-full sm:w-16 text-center text-sm",
                      themeConfig.card,
                      themeConfig.cardForeground,
                      themeConfig.border,
                      themeConfig.fontClass,
                    )}
                  />
                </div>
                <div className="flex flex-col gap-1 sm:gap-1.5">
                  <Label htmlFor="seconds" className={cn("text-[10px] sm:text-xs", themeConfig.mutedForeground)}>
                    Сек
                  </Label>
                  <Input
                    id="seconds"
                    type="number"
                    min="0"
                    max="59"
                    value={seconds}
                    onChange={(e) => setSeconds(e.target.value)}
                    className={cn(
                      "w-full sm:w-16 text-center text-sm",
                      themeConfig.card,
                      themeConfig.cardForeground,
                      themeConfig.border,
                      themeConfig.fontClass,
                    )}
                  />
                </div>
              </div>
              <button
                onClick={handleSetTimer}
                className={cn(
                  "w-full sm:w-auto px-5 py-2 rounded-lg font-medium transition-all duration-200",
                  "hover:scale-105 active:scale-95",
                  themeConfig.accent,
                  themeConfig.accentForeground,
                  themeConfig.fontClass,
                  theme === "neon" && "shadow-[0_0_20px_rgba(34,211,238,0.5)]",
                  theme === "luxury" && "shadow-[0_0_20px_rgba(251,191,36,0.3)]",
                )}
              >
                {theme === "terminal" ? "execute()" : "Задать"}
              </button>
            </div>
          )}

          {/* Email Signup */}
          <div
            className={cn(
              "w-full max-w-md flex flex-col gap-2 sm:gap-3 p-2 rounded-2xl border transition-all",
              themeConfig.muted,
              themeConfig.border,
              theme === "glass" && "backdrop-blur-xl bg-white/40",
              theme === "neon" && "shadow-[0_0_20px_rgba(34,211,238,0.1)]",
            )}
          >
            <Input
              type="email"
              placeholder={theme === "terminal" ? "your@email.sh" : "Ваш email — узнаете первым"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                "flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none text-sm sm:text-base",
                themeConfig.cardForeground,
                themeConfig.fontClass,
                "placeholder:opacity-50",
              )}
            />
            <button
              className={cn(
                "w-full px-4 sm:px-6 py-2.5 font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base sm:py-1.5 rounded-lg",
                "hover:scale-[1.02] active:scale-[0.98]",
                themeConfig.accent,
                themeConfig.accentForeground,
                themeConfig.fontClass,
                theme === "neon" && "shadow-[0_0_25px_rgba(34,211,238,0.5)]",
                theme === "luxury" && "shadow-[0_0_25px_rgba(251,191,36,0.3)]",
              )}
            >
              {currentContent.cta}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Features */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-10 flex-wrap">
            {currentContent.features.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm",
                  themeConfig.mutedForeground,
                  themeConfig.fontClass,
                )}
              >
                <feature.icon
                  className={cn(
                    "w-3.5 h-3.5 sm:w-4 sm:h-4",
                    theme === "neon" && "text-cyan-400",
                    theme === "luxury" && "text-amber-400",
                    theme === "glass" && "text-indigo-500",
                  )}
                />
                <span>{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Schedule */}
          {(() => {
            const sections = [
              {
                id: "s1",
                title: "Секция 1",
                subtitle: "Заседание межведомственной рабочей группы по совершенствованию оказания первой помощи в Белгородской области",
                time: "10:30 – 13:30",
                location: "Локация №1 «Креатив-Таун»",
                moderators: [
                  { name: "Иконников А.А.", role: "министр здравоохранения Белгородской области, заместитель председателя рабочей группы" },
                  { name: "Колодкин А.А.", role: "главный внештатный специалист по первой помощи Минздрава России, заместитель директора института усовершенствования врачей ФГБУ «НМХЦ имени Н. И. Пирогова» Минздрава России" },
                  { name: "Жиров А.В.", role: "главный врач ОГБУЗ «Станция скорой медицинской помощи Белгородской области», главный внештатный специалист МЗ БО по скорой медицинской помощи" },
                  { name: "Григорьев С.А.", role: "секретарь рабочей группы" },
                ],
                reports: [
                  { num: "01", vksTime: "", title: "Основные принципы организации системы обучения Первой помощи в РФ, новые изменения в законодательстве. Рекомендации по работе группы", speaker: "Колодкин Андрей Андреевич", role: "Главный внештатный специалист по первой помощи Минздрава России, заместитель директора института усовершенствования врачей ФГБУ «НМХЦ имени Н. И. Пирогова» Минздрава России" },
                  { num: "02", vksTime: "", title: "О реализации проекта по обучению Первой помощи в Белгородской области", speaker: "Винюкова Галина Алексеевна", role: "Председатель Белгородского общества первой помощи, заведующий Губкинской ПС" },
                  { num: "03", vksTime: "", title: "О создании единого методического центра по ПП. Принципы организации учебных программ", speaker: "Григорьев Станислав Александрович", role: "Заведующий учебно-методическим центром ОСМК ОГБУЗ «ССМП БО», главный внештатный специалист МЗ БО по ПП" },
                  { num: "04", vksTime: "", title: "Система обучения первой помощи в Луганской народной республике. Основные проблемы и пути решения", speaker: "Калугина Виктория Александровна", role: "Заместитель директора по оперативной работе, медицине катастроф и защите населения ГБУЗ «Луганский республиканский центр экстренной медицинской помощи и медицины катастроф»" },
                  { num: "05", vksTime: "", title: "Создание и развитие добровольческого движения по оказанию первой помощи в Курской области", speaker: "Сухарева Елена Егоровна", role: "Заведующая учебно-методическим отделом ТЦМК ОБУЗ «КОМКБ»" },
                  { num: "06", vksTime: "12:20", title: "Опыт организации массового обучения населения навыкам первой помощи в ХМАО – Югре", speaker: "Федько Роман Васильевич", role: "Главный внештатный специалист по первой помощи Департамента здравоохранения ХМАО – Югры" },
                  { num: "07", vksTime: "12:35", title: "Дистанционное консультирование первой помощи до приезда бригады СМП. Опыт Республики Коми 2025", speaker: "Головина Татьяна Трофимовна", role: "Заместитель главного врача по оперативной работе ГБУ РК ТЦМК Республики Коми" },
                  { num: "08", vksTime: "12:50", title: "Алгоритм использования АНД при расширенной СЛР", speaker: "Согомонян Карен Ашотович", role: "к.м.н., главный врач ГБУЗ «ССМП города-курорта Геленджик»" },
                ],
              },
              {
                id: "s2",
                title: "Секция 2",
                subtitle: "Организация обучения первой помощи в образовательных организациях",
                time: "10:30 – 13:30",
                location: "Локация №2 «Креатив-Таун»",
                moderators: [
                  { name: "Дежурный Л.И.", role: "д.м.н., профессор, председатель Российского общества первой помощи, руководитель Методического аккредитационно-симуляционного центра ФГБУ «ЦНИИ ОИЗ» Минздрава России" },
                  { name: "Дуброва В.А.", role: "директор Медицинского колледжа НИУ «БелГУ»" },
                  { name: "Козлова И.Э.", role: "начальник организационно-методического отдела ОГКУЗ «МИАЦ»" },
                ],
                reports: [
                  { num: "01", vksTime: "", title: "Первая помощь. Основы преподавания первой помощи в образовательных организациях", speaker: "Дежурный Леонид Игоревич", role: "Председатель Российского общества первой помощи" },
                  { num: "02", vksTime: "", title: "Об учебно-методическом комплексе по первой помощи", speaker: "Козлова Инна Эдуардовна", role: "Начальник организационно-методического отдела ОГКУЗ «МИАЦ»" },
                  { num: "03", vksTime: "", title: "О методических рекомендациях по проведению конкурсов, фестивалей, соревнований по ПП в области", speaker: "Овсянникова Виктория Александровна", role: "Врач выездной бригады скорой помощи БЭР ОСМК и МСАЭ ОГБУЗ «ССМП Белгородской области»" },
                  { num: "04", vksTime: "", title: "Образовательная траектория учащихся медицинских классов", speaker: "Наливайко Лариса Васильевна", role: "Врач БЭР ОСМК и МСАЭ ОГБУЗ «ССМП Белгородской области», преподаватель дополнительного образования" },
                  { num: "05", vksTime: "", title: "Возможность обучения дошкольников навыкам оказания первой помощи. Программа «Коленька научит»", speaker: "Ушакова Нина Иосифовна", role: "Председатель БРО ООО РКК" },
                  { num: "06", vksTime: "", title: "Опыт подготовки инструкторов первой помощи из числа студентов Медицинского колледжа НИУ «БелГУ»", speaker: "Дуброва Владислав Александрович", role: "Директор Медицинского колледжа НИУ «БелГУ»" },
                  { num: "07", vksTime: "", title: "Психологическая готовность к оказанию ПП, психологическая поддержка", speaker: "Машковцев Вадим Викторович", role: "Фельдшер ОСМК и МСАЭ ОГБУЗ «ССМП Белгородской области»" },
                  { num: "08", vksTime: "", title: "Типовая программа обучения инструктора первой помощи в образовательных организациях. Основные ошибки при обучении. Изменение в программы автошкол", speaker: "Астионова Диана Юрьевна", role: "Врач-анестезиолог реаниматолог БЭР ОСМК и МСАЭ ОГБУЗ «ССМП Белгородской области»" },
                ],
              },
              {
                id: "s3",
                title: "Секция 3",
                subtitle: "Первая помощь в работе экстренных служб и силовых структур",
                time: "10:30 – 13:30",
                location: "Лекторий КЦ «Октябрь»",
                moderators: [
                  { name: "Лежнина Е.А.", role: "начальник учебно-методического отдела ФЦМК Института усовершенствования врачей ФГБУ «НМХЦ им. Н.И. Пирогова» Минздрава России, спасатель 1 класса" },
                  { name: "Потапова Л.А.", role: "заведующий ОСМК и МСАЭ ОГБУЗ «ССМП Белгородской области», главный внештатный специалист по медицине катастроф МЗ Белгородской области" },
                ],
                reports: [
                  { num: "01", vksTime: "10:40", title: "Преемственность оказания первой и скорой медицинской помощи", speaker: "Станишевский Александр Леонидович", role: "Старший преподаватель кафедры скорой медицинской помощи и медицины катастроф, Белорусский государственный медицинский университет" },
                  { num: "02", vksTime: "", title: "Организация обучения оказанию первой помощи пожарных и спасателей в связи с принятием нового порядка", speaker: "Логинова Оксана Викторовна", role: "Начальник отдела медико-психологического обеспечения Управления МТО Главного управления МЧС России по Белгородской области" },
                  { num: "03", vksTime: "11:20", title: "Опыт обучения водителей СМП навыкам ПП и их применение в работе бригады", speaker: "Стяжкин Дмитрий Николаевич", role: "Зам. главного врача ГБУЗ «ССМП города-курорта Геленджик»" },
                  { num: "04", vksTime: "", title: "Сердечно-лёгочная реанимация: новые возможности. Опыт оснащения мест массового скопления людей АНД", speaker: "Хлынцева Ирина Сергеевна", role: "Директор АНО «Академия безопасности и технологий выживания»" },
                  { num: "05", vksTime: "", title: "Региональный опыт системы обучения населения первой помощи в Запорожской области", speaker: "Слуцкий Роман Олегович", role: "Руководитель Белгородского регионального отделения ВСК" },
                  { num: "06", vksTime: "", title: "Основные изменения в законодательстве. Обзор и использование современных средств на догоспитальном этапе, ответственность", speaker: "Минаков Андрей Сергеевич", role: "Фельдшер ОСМК и МСАЭ ОГБУЗ «ССМП Белгородской области»" },
                  { num: "07", vksTime: "", title: "Особенности обучения сотрудников добровольческих формирований и специальных отрядов. От первой помощи к тактике", speaker: "Худотеплая Ульяна Юрьевна", role: "Врач-анестезиолог реаниматолог БЭР ОСМК и МСАЭ ОГБУЗ «ССМП Белгородской области»" },
                  { num: "08", vksTime: "", title: "Дистанционное диспетчерское сопровождение в практике службы СМП Белгородской области", speaker: "Осадчая Елизавета Александровна", role: "Медицинская сестра по приему и передаче вызовов СМП ОГБУЗ «ССМП Белгородской области»" },
                  { num: "09", vksTime: "", title: "Опыт проведения мастер-классов в отдалённых районах Белгородской области", speaker: "Фугаревич Дарья Андреевна", role: "Координатор направления «Обучение первой помощи и сопровождение массовых мероприятий»" },
                ],
              },
            ]

            const sec = sections[activeSection]

            return (
              <div className="w-full max-w-3xl mt-4">
                <div className={cn("text-center mb-6", themeConfig.fontClass)}>
                  <p className={cn("text-xs uppercase tracking-widest mb-1", themeConfig.mutedForeground)}>
                    Программа форума
                  </p>
                  <p className={cn("text-lg font-bold", themeConfig.foreground)}>6 марта 2026 года</p>
                </div>

                {/* Section tabs */}
                <div className="flex gap-2 mb-4 flex-wrap justify-center">
                  {sections.map((s, i) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveSection(i)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all",
                        themeConfig.fontClass,
                        themeConfig.border,
                        i === activeSection
                          ? cn(themeConfig.accent, themeConfig.accentForeground, theme === "neon" && "shadow-[0_0_15px_rgba(34,211,238,0.4)]")
                          : cn(themeConfig.muted, themeConfig.mutedForeground, "hover:opacity-80"),
                      )}
                    >
                      {s.title}
                    </button>
                  ))}
                </div>

                {/* Section header */}
                <div className={cn("p-4 rounded-xl border mb-3", themeConfig.muted, themeConfig.border, theme === "glass" && "backdrop-blur-xl bg-white/30")}>
                  <p className={cn("text-sm font-bold uppercase tracking-wide mb-1", themeConfig.foreground, themeConfig.fontClass)}>{sec.subtitle}</p>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className={cn("flex items-center gap-1 text-xs", themeConfig.mutedForeground, themeConfig.fontClass)}>
                      <Icon name="Clock" size={12} />{sec.time}
                    </span>
                    <span className={cn("flex items-center gap-1 text-xs", themeConfig.mutedForeground, themeConfig.fontClass)}>
                      <Icon name="MapPin" size={12} />{sec.location}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-col gap-1">
                    <p className={cn("text-[11px] uppercase tracking-widest font-semibold mb-1", themeConfig.mutedForeground, themeConfig.fontClass)}>Модераторы:</p>
                    {sec.moderators.map((m, i) => (
                      <div key={i} className={cn("flex items-start gap-1 text-xs", themeConfig.mutedForeground, themeConfig.fontClass)}>
                        <Icon name="User" size={11} className="mt-0.5 shrink-0" />
                        <span><span className="font-semibold">{m.name}</span> — {m.role}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reports */}
                <div className="flex flex-col gap-2">
                  {sec.reports.map((item) => (
                    <div
                      key={item.num}
                      className={cn(
                        "flex gap-3 p-3 rounded-xl border transition-all",
                        themeConfig.muted,
                        themeConfig.border,
                        theme === "glass" && "backdrop-blur-xl bg-white/20",
                        theme === "neon" && "shadow-[0_0_8px_rgba(34,211,238,0.06)]",
                      )}
                    >
                      <div className={cn("text-base font-bold tabular-nums shrink-0 w-6 text-center pt-0.5", themeConfig.mutedForeground, themeConfig.fontClass)}>
                        {item.num}
                      </div>
                      <div className="flex flex-col gap-1 min-w-0">
                        {item.vksTime && (
                          <span className={cn(
                            "self-start text-[10px] px-2 py-0.5 rounded-full border font-medium",
                            themeConfig.border,
                            themeConfig.mutedForeground,
                            theme === "neon" && "border-cyan-500/50 text-cyan-400",
                            theme === "luxury" && "border-amber-500/30 text-amber-400",
                          )}>
                            ВКС {item.vksTime}
                          </span>
                        )}
                        <p className={cn("text-sm font-semibold leading-snug", themeConfig.foreground, themeConfig.fontClass)}>
                          {item.title}
                        </p>
                        <div className={cn("flex items-start gap-1", themeConfig.mutedForeground)}>
                          <Icon name="User" size={11} className="mt-0.5 shrink-0" />
                          <div className="flex flex-col">
                            <span className={cn("text-xs font-medium", themeConfig.fontClass)}>{item.speaker}</span>
                            <span className={cn("text-[11px] leading-snug", themeConfig.fontClass)}>{item.role}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })()}

          {/* Social Proof */}
          <div
            className={cn(
              "flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-4 sm:pt-6",
              themeConfig.mutedForeground,
              themeConfig.fontClass,
            )}
          >
            <div className="flex -space-x-2">
              {[
                "/professional-woman-headshot.png",
                "/young-man-portrait-smiling.jpg",
                "/asian-woman-professional-photo.jpg",
                "/bearded-man-headshot.png",
                "/smiling-black-woman-portrait.png",
              ].map((src, i) => (
                <img
                  key={i}
                  src={src || "/placeholder.svg"}
                  alt={`User ${i + 1}`}
                  className={cn(
                    "w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 object-cover",
                    theme === "dark" || theme === "neon" || theme === "terminal" || theme === "luxury"
                      ? "border-zinc-800"
                      : "border-white",
                  )}
                />
              ))}
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <div className="flex items-center gap-0.5 sm:gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current",
                      theme === "luxury" && "text-amber-400",
                      theme === "neon" && "text-cyan-400",
                      theme === "retro" && "text-amber-600",
                      (theme === "minimal-light" ||
                        theme === "dark" ||
                        theme === "monochrome" ||
                        theme === "glass" ||
                        theme === "terminal") &&
                        "text-current",
                    )}
                  />
                ))}
              </div>
              <span className="text-[10px] sm:text-xs">
                {theme === "terminal" ? "// 1200 members_waiting" : "Уже 1 200+ участников ждут открытия"}
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={cn(
          "relative z-10 py-6 sm:py-8 text-center border-t px-4",
          themeConfig.border,
          themeConfig.mutedForeground,
          themeConfig.fontClass,
        )}
      >
        <p className="text-xs sm:text-sm">
          {theme === "terminal"
            ? "© 2026 // pervaya_pomosh | forum --first_aid | privacy --policy"
            : "© 2026 Первая помощь — дорога к спасению жизни · Политика конфиденциальности"}
        </p>
      </footer>
    </div>
  )
}