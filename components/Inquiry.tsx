'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Send, CheckCircle } from 'lucide-react'
import { useLang } from '@/contexts/LanguageContext'
import { useTranslations } from '@/lib/translations'
import { CONTACT_EMAIL } from '@/lib/contact'

export default function Inquiry() {
  const { lang } = useLang()
  const t = useTranslations(lang)

  const SUBJECTS = [t('inquiry.s1'), t('inquiry.s2'), t('inquiry.s3'), t('inquiry.s4'), t('inquiry.s5'), t('inquiry.s6')]

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
    <section id="contact" className="py-16 md:py-24 bg-blush dark:bg-ink/50 border-y border-ink/8 dark:border-gallery/8">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col justify-center"
          >
            <span className="text-xs font-semibold tracking-widest text-brand uppercase mb-6 block">
              {t('inquiry.label')}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-normal text-ink dark:text-gallery mb-5 md:mb-6 leading-tight">
              {t('inquiry.title1')}<br />{t('inquiry.title2')}
            </h2>
            <p className="text-base text-ink/55 dark:text-gallery/55 leading-relaxed mb-10 max-w-sm">
              {t('inquiry.subtitle')}
            </p>
            <div className="space-y-4 text-sm text-ink/45 dark:text-gallery/45">
              {[t('inquiry.bullet1'), t('inquiry.bullet2'), t('inquiry.bullet3')].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-brand mt-2 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {draftOpened ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center justify-center h-full min-h-[400px] text-center gap-6"
              >
                <div className="w-16 h-16 rounded-full bg-brand/10 flex items-center justify-center">
                  <CheckCircle size={28} strokeWidth={1.5} className="text-brand" />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-ink dark:text-gallery mb-2">{t('inquiry.success.title')}</h3>
                  <p className="text-sm text-ink/50 dark:text-gallery/50 max-w-xs">
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
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'firstName', placeholder: 'Marie', label: t('inquiry.firstName') },
                    { name: 'lastName', placeholder: 'Dupont', label: t('inquiry.lastName') },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="block text-xs font-medium text-ink/50 dark:text-gallery/50 mb-1.5">{f.label}</label>
                      <input
                        type="text"
                        name={f.name}
                        value={form[f.name as keyof typeof form]}
                        onChange={handleChange}
                        required
                        placeholder={f.placeholder}
                        className="w-full bg-gallery dark:bg-ink border border-ink/12 dark:border-gallery/12 rounded-lg px-4 py-3.5 text-sm text-ink dark:text-gallery placeholder:text-ink/30 dark:placeholder:text-gallery/30 outline-none focus:border-brand transition-colors"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-medium text-ink/50 dark:text-gallery/50 mb-1.5">{t('inquiry.email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="marie@exemple.com"
                    className="w-full bg-gallery dark:bg-ink border border-ink/12 dark:border-gallery/12 rounded-lg px-4 py-3.5 text-sm text-ink dark:text-gallery placeholder:text-ink/30 dark:placeholder:text-gallery/30 outline-none focus:border-brand transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-ink/50 dark:text-gallery/50 mb-1.5">{t('inquiry.subject')}</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-gallery dark:bg-ink border border-ink/12 dark:border-gallery/12 rounded-lg px-4 py-3.5 text-sm text-ink dark:text-gallery outline-none focus:border-brand transition-colors appearance-none"
                  >
                    <option value="" disabled>{t('inquiry.subjectPlaceholder')}</option>
                    {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-ink/50 dark:text-gallery/50 mb-1.5">{t('inquiry.message')}</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder={t('inquiry.messagePlaceholder')}
                    className="w-full bg-gallery dark:bg-ink border border-ink/12 dark:border-gallery/12 rounded-lg px-4 py-3.5 text-sm text-ink dark:text-gallery placeholder:text-ink/30 dark:placeholder:text-gallery/30 outline-none focus:border-brand transition-colors resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-brand hover:bg-brand-deep text-white py-4 rounded-full text-sm font-medium transition-colors flex items-center justify-center gap-2.5 shadow-sm shadow-brand/20 mt-2"
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
