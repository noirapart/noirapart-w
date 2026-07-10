'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Send, CheckCircle, Mail, Clock, Languages } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'
import { CONTACT_EMAIL } from '@/lib/contact'

export default function Inquiry() {
  const { lang } = useLang()
  const t = useTranslations(lang)

  const SUBJECTS = [t('inquiry.s1'), t('inquiry.s2'), t('inquiry.s3'), t('inquiry.s4'), t('inquiry.s5'), t('inquiry.s6')]
  const CONTACT_DETAILS = [
    { icon: Mail, label: t('inquiry.directEmailLabel'), value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    { icon: Clock, label: t('inquiry.responseLabel'), value: t('inquiry.bullet1') },
    { icon: Languages, label: t('inquiry.languageLabel'), value: t('inquiry.bullet2') },
  ]
  const labelClass = 'block text-xs font-semibold text-ink/75 dark:text-gallery/75 mb-2'
  const inputClass = 'w-full bg-white dark:bg-gallery/[0.05] border border-ink/15 dark:border-gallery/18 rounded-lg px-4 py-3.5 text-sm text-ink dark:text-gallery placeholder:text-ink/45 dark:placeholder:text-gallery/45 outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-colors'

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', subject: '', message: '',
  })
  const [draftOpened, setDraftOpened] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const fullName = `${form.firstName} ${form.lastName}`.trim()
    const subject = encodeURIComponent(`NOIR A PART - ${form.subject}`)
    const body = encodeURIComponent(
      [
        `Nom: ${fullName}`,
        `Email: ${form.email}`,
        `Sujet: ${form.subject}`,
        '',
        form.message,
      ].join('\n')
    )

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setDraftOpened(true)
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-gallery py-16 text-ink dark:bg-ink-soft dark:text-gallery md:py-24 border-y border-ink/10 dark:border-gallery/10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-brand/80" />
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 hidden w-2 bg-brand md:block" />
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div ref={ref} className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 xl:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center lg:py-6"
          >
            <span className="mb-6 block text-xs font-semibold uppercase text-brand">
              {t('inquiry.label')}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-normal text-ink dark:text-gallery mb-5 md:mb-6 leading-tight">
              {lang === 'en' || !t('inquiry.title2') ? (
                <span className="whitespace-nowrap">{t('inquiry.title1')}{t('inquiry.title2')}</span>
              ) : (
                <>{t('inquiry.title1')}<br />{t('inquiry.title2')}</>
              )}
            </h2>
            <p className="text-base md:text-lg text-ink/75 dark:text-gallery/76 leading-relaxed max-w-xl">
              {t('inquiry.subtitle')}
            </p>

            <div className="mt-9 divide-y divide-ink/10 border-y border-ink/10 dark:divide-gallery/12 dark:border-gallery/12">
              {CONTACT_DETAILS.map(({ icon: Icon, label, value, href }) => {
                const content = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-ink/10 bg-white text-brand dark:border-gallery/14 dark:bg-gallery/[0.06]">
                      <Icon size={18} strokeWidth={1.7} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-semibold text-ink/60 dark:text-gallery/62">{label}</span>
                      <span className="mt-1 block break-words text-sm font-medium leading-relaxed text-ink dark:text-gallery">
                        {value}
                      </span>
                    </span>
                  </>
                )

                return href ? (
                  <a
                    key={label}
                    href={href}
                    className="group flex items-center gap-4 py-4 transition-colors hover:text-brand"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={label} className="flex items-center gap-4 py-4">
                    {content}
                  </div>
                )
              })}
            </div>

            <div className="mt-8 border-l-2 border-brand pl-4">
              <p className="text-xs font-semibold text-brand">{t('inquiry.scopeLabel')}</p>
              <p className="mt-2 max-w-lg text-sm leading-relaxed text-ink/75 dark:text-gallery/72">
                {t('inquiry.bullet3')}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-xl border border-ink/12 bg-white p-5 shadow-[0_24px_70px_rgba(26,10,13,0.10)] dark:border-gallery/14 dark:bg-ink-card dark:shadow-none sm:p-6 md:p-8"
          >
            {draftOpened ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center justify-center h-full min-h-[420px] text-center gap-6"
              >
                <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center">
                  <CheckCircle size={28} strokeWidth={1.5} className="text-brand" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-ink dark:text-gallery mb-2">{t('inquiry.success.title')}</h3>
                  <p className="text-sm leading-relaxed text-ink/72 dark:text-gallery/72 max-w-xs">
                    {t('inquiry.success.body')}
                  </p>
                </div>
                <button
                  onClick={() => { setDraftOpened(false); setForm({ firstName: '', lastName: '', email: '', subject: '', message: '' }) }}
                  className="text-sm font-medium text-brand underline underline-offset-4"
                >
                  {t('inquiry.success.link')}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-ink/10 pb-5 dark:border-gallery/10">
                  <p className="text-base font-medium text-ink dark:text-gallery">{t('inquiry.formTitle')}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70 dark:text-gallery/72">
                    {t('inquiry.formNote')}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'firstName', placeholder: 'Marie', label: t('inquiry.firstName') },
                    { name: 'lastName', placeholder: 'Dupont', label: t('inquiry.lastName') },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className={labelClass}>{f.label}</label>
                      <input
                        type="text"
                        name={f.name}
                        value={form[f.name as keyof typeof form]}
                        onChange={handleChange}
                        required
                        placeholder={f.placeholder}
                        className={inputClass}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className={labelClass}>{t('inquiry.email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="marie@exemple.com"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>{t('inquiry.subject')}</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className={`${inputClass} appearance-none`}
                  >
                    <option value="" disabled>{t('inquiry.subjectPlaceholder')}</option>
                    {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>{t('inquiry.message')}</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder={t('inquiry.messagePlaceholder')}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-brand hover:bg-brand-deep text-white min-h-12 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2.5 shadow-sm shadow-brand/20 mt-2 focus-visible:outline-gallery"
                >
                  <Send size={16} strokeWidth={1.5} />
                  {t('inquiry.submit')}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
