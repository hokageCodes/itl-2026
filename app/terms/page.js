"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { FileText, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function TermsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1, margin: "-100px" });
  const [openSections, setOpenSections] = useState({ A: true, B: false, C: false });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* Banner Section */}
      <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80"
            alt="Terms and Conditions"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20" />
          
          {/* Banner Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
              <motion.div
                className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-primary-100/20 backdrop-blur-sm rounded-full mb-6 sm:mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </motion.div>
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Terms and Conditions
              </motion.h1>
              <motion.p
                className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Please read these terms carefully before using our website
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white" ref={ref}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="prose prose-lg max-w-none"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Section A Accordion */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection('A')}
                className="w-full bg-primary-600 text-white px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-between hover:bg-primary-700 transition-colors rounded-t-lg"
                aria-expanded={openSections.A}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-left">
                  A. Terms and Conditions for Use of Website
                </h2>
                <motion.div
                  animate={{ rotate: openSections.A ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openSections.A ? "auto" : 0,
                  opacity: openSections.A ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-white border border-t-0 border-neutral-200 rounded-b-lg p-6 sm:p-8">
                  <div className="space-y-6 text-neutral-700 leading-relaxed">
              <p>
                <strong>Important Notice:</strong> Please read these terms of service carefully before registering for or using the ITL Conference website and services. These terms of service ("Agreement") govern your access to and use of https://www.itlconference.ca (and any subdomains), as well as its affiliates' websites and mobile applications. This Agreement is between you ("you") and the ITL Conference, and it is subject to change as described below. By registering on or using this site, you (i) accept this Agreement; (ii) agree to be bound by these terms and conditions; and (iii) enter into a binding agreement with the ITL Conference.
              </p>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">Ownership of Site:</h3>
                <p>
                  This web site and any other site powered by the ITL Conference (collectively the "Site") is owned and operated by the ITL Conference (referred to as "the ITL Conference" herein) or on behalf of the ITL Conference, or for the ITL Conference organizers (referred to as "Organizers" herein). The Site and its content ("Content") and the ITL Conference services ("Service") may only be accessed in accordance with this Agreement. Any violation of the copyright in the Content or these terms and conditions may be enforced by the ITL Conference, Organizers, or the copyright owner to the fullest extent allowed by law.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">Service Availability:</h3>
                <p>
                  You acknowledge and agree that the ITL Conference or Organizers may stop (permanently or temporarily) providing the Services (or any features within the Services) to you or to users generally at the ITL Conference's and Organizers sole discretion, without prior notice to you. You may stop using the Services at any time. You do not need to specifically inform the ITL Conference and Organizers when you stop using the Services. You acknowledge and agree that if the ITL Conference or Organizers disables access to your account, you may be prevented from accessing the Services, your account details or any files or other materials which is contained in your account.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">Accessing Services:</h3>
                <p>
                  You agree not to access (or attempt to access) any of the Services by any means other than through the interface that is provided by the ITL Conference, unless you have been specifically allowed to do so in a separate agreement with the ITL Conference. You agree that you will not engage in any activity that interferes with or disrupts the Services (or the servers and networks which are connected to the Services). Unless you have been specifically permitted to do so in a separate agreement with the ITL Conference, you agree that you will not reproduce, duplicate, copy, sell, trade or resell the Services or anything located on the Site for any purpose. You agree that you are solely responsible for (and that the ITL Conference and Organizers have no responsibility to you or to any third party for) any breach of your obligations under this Agreement and for the consequences (including any loss or damage which the ITL Conference and/or Organizers may suffer) of any such breach.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">Carrier Fees:</h3>
                <p>
                  The ITL Conference and Organizers do not charge for access using its mobile application; however, your carrier rates will apply, such as fees for text messaging and data charges. You hereby acknowledge, agree, and provide consent in order for users to sync any device with your information.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">Cookies:</h3>
                <p>
                  You understand that the Site employs the use of cookies, and you hereby acknowledge and agree that by using the Site that you to consent to the use of cookies in accordance with the ITL Conference's Privacy Policy.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">Responsibility for Content:</h3>
                <p>
                  You understand that all information (such as data files, written text, computer software, music, audio files or other sounds, photographs, videos or other images) which you may have access to as part of, or through your use of, the Services are the sole responsibility of the person from which such materials originated, which may be you.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">Linking Policy:</h3>
                <p className="mb-3">
                  7. The ITL Conference and Organizers allow the following organizations to link to the Site without prior written approval:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>(a) government agencies,</li>
                  <li>(b) search engines,</li>
                  <li>(c) news organizations,</li>
                  <li>(d) online directory distributors when they list the ITL Conference or Organizers in the directory may link to the Site in the same manner as they hyperlink to the websites of other listed businesses,</li>
                  <li>(e) and systemwide accredited businesses, except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to the Site.</li>
                </ul>
                <p className="mb-3">
                  The above mentioned organizations may link to the ITL Conference or Organizers home page, to the ITL Conference's and/or Organizers publications on the Site, or to other Site information so long as the link:
                </p>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>(a) is not in any way misleading,</li>
                  <li>(b) the link does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services, and</li>
                  <li>(c) fits within the context of the linking party's site. The ITL Conference and Organizers may consider and approve, in their sole discretion, other link requests from the following types of organizations:</li>
                </ul>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>(a) commonly-known consumer and/or business information sources</li>
                  <li>(b) dot.com community sites,</li>
                  <li>(c) associations or other groups representing charities, including charity giving sites,</li>
                  <li>(d) online directory distributors,</li>
                  <li>(e) internet portals,</li>
                  <li>(f) accounting, law and consulting firms whose primary clients are businesses, and</li>
                  <li>(g) educational institutions and trade associations. These organizations may link to the ITL Conference's and/or Organizers Site homepage, to publications or to other website information provided that the link:</li>
                </ul>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>(a) is not in any way misleading,</li>
                  <li>(b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services, and</li>
                  <li>(c) fits within the context of the linking party's site. If you are among the organizations listed in this Section and are interested in linking to our website, you must notify the ITL Conference and Organizers by sending an e-mail to info@itlconference.ca. Please include your name, your organization name, contact information (such as a phone number and/or e-mail address) as well as the URL of your site, a list of any URLs from which you intend to link to our Web site, and a list of the URL(s) on our site to which you would like to link. Please allow 2-3 weeks for a response. Approved organizations may hyperlink to the Site as follows</li>
                </ul>
                <ul className="list-disc pl-6 space-y-2 mb-4">
                  <li>(i) by use of the ITL Conference's or Organizers corporate name, or</li>
                  <li>(ii) by use of the uniform resource locator (web address) being linked to; or</li>
                  <li>(iii) by use of any other description of the Site or material being linked to that makes sense within the context and format of content on the linking party's site. No use of the ITL Conference's or Organizers logo or other artwork will be allowed for linking absent a trademark license agreement</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">Framing Restrictions:</h3>
                <p>
                  Without prior approval and express written permission from the ITL Conference or Organizers, you may not create frames around the Site or use other techniques that alter in any way the visual presentation or appearance of the Site.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">Rights Reserved:</h3>
                <p>
                  The ITL Conference and Organizers reserves all rights not specifically granted herein. You shall not modify any copyright notices, proprietary legends, any trademark and service mark attributions, any patent markings, and other indicia of ownership on the Content or other materials accessed through the Service. The delivery of, and license to, the Content and/or access to third party materials does not transfer to you any commercial or promotional use rights in the Content or any portion thereof. Any use of Content, or descriptions; any derivative use of this Site or its materials; and any use of data mining, robots, or similar data gathering, and extraction tools is strictly prohibited. In no event shall the user frame any portion of the Site, or any materials contained therein.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">Accuracy Disclaimer:</h3>
                <p>
                  While the ITL Conference and Organizers use reasonable efforts to include accurate and up-to-date information on the Site, the ITL Conference and Organizers make no warranties or representations as to its accuracy. The ITL Conference and Organizers assume no liability or responsibility for any errors or representations in the Content or this Site.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">External Links:</h3>
                <p>
                  The Site may contain links to other sites on the Internet which are owned and operated by Third Party Vendors and other third parties (the "External Sites"). You acknowledge that the ITL Conference and Organizers are not responsible for the availability of, or the materials located on or through, any External Sites. You should contact the site administrator or webmaster for those External Sites if you have any concerns regarding such links or the materials located on such External Sites.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">User-Generated Content:</h3>
                <p>
                  Users of the Site may post comments, reviews, and other materials and submit suggestions, ideas, or other information, provided, the materials do not contain any unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or hateful content or content which is racially, ethnically or otherwise objectionable, or which infringes upon the rights of any third party. You acknowledge that by accessing the Site, you may come into contact with content that you find harmful, offensive, threatening, indecent or objectionable and you acknowledge that ITL Conference and Organizers shall have no liability to you for the content including, but not limited to explicit language and other potentially offensive material. The user agrees to not impersonate any person or communicate under a false name or a name the user is not entitled or authorized to use. The ITL Conference and Organizers have the right (but not the obligation) to remove, prohibit, edit or discontinue any content on the Site, including content that has been posted by users.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">Ownership of Submissions:</h3>
                <p>
                  If you post content or submit material, unless such content or material submittal is subject to separate terms and conditions, the ITL Conference shall own such content and material, and you hereby assign any rights in such content and material to the ITL Conference. In the event ownership in the content or material cannot be granted to the ITL Conference, you grant the ITL Conference and its affiliates a perpetual, irrevocable, worldwide, royalty-free, non-exclusive, sublicensable right and license to make, use, sell, sublicense, reproduce, distribute, perform, display, prepare derivative works from and otherwise exploit all such content and material as if it were the full owner thereof. Furthermore, you grant the ITL Conference, its affiliates, and sublicensees the right to use your name and/or username in connection with the content. You represent and warrant that all content and materials you provide shall be your original work product and will not be based on, or derived from, the proprietary information or items of a third-party. Furthermore, you represent and warrant that your use of the Service in connection with any Content or third-party content complies with all laws including, but not limited to, Canada's copyright law. You will defend, indemnify and hold the ITL Conference and its affiliates harmless from and against any claims resulting from any content or materials you provide hereunder or your use of the Service.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">Feedback Ownership:</h3>
                <p>
                  At your discretion, you may provide feedback to the ITL Conference and Organizers concerning the functionality and performance of the Service from time to time, including, without limitation, identifying potential errors, improvements, modifications, bug fixes, or enhancements ("Feedback"). If you, through your evaluation or otherwise, suggests any Feedback, you hereby assign the ownership in all Feedback to the ITL Conference. In the event ownership in the Feedback cannot be granted to the ITL Conference, you grant the ITL Conference at no charge a perpetual, irrevocable, royalty-free, worldwide right and license to use, reproduce, disclose, sublicense, distribute, modify, and otherwise exploit such Feedback without restriction. You agree that the ITL Conference and Organizers may disclose that Feedback to any third party in any manner and you agree that the ITL Conference and Organizers have the ability to sublicense all Feedback in any form to any third party without restriction.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">Additional Terms:</h3>
                <p>
                  The Site may contain areas in which additional terms and conditions apply. For purposes of the use of such areas, in the event of a conflict between the terms and conditions of such other areas and these Terms and Conditions, the terms and conditions of the other area shall prevail. The ITL Conference and Organizers may at any time revise these Terms and Conditions by updating this posting. You are bound by any such revisions and should therefore periodically visit this page to review the current Terms and Conditions to which you are bound.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">Prohibited Activities:</h3>
                <p>
                  You shall not transmit to the ITL Conference or Organizers or upload to this Site any Harmful Code or use or misappropriate the data on this Site for your own commercial gain. "Harmful Code" shall mean any software (sometimes referred to as "viruses," "worms," "trojan horses," "time bombs," "time locks," "drop dead devices," "traps," "access codes," "cancelbots" or "trap door devices") that: (a) is intentionally designed to damage, disrupt, disable, harm, impair, interfere with, intercept, expropriate or otherwise impede in any manner, any data, storage media, program, system, equipment or communication, based on any event, including for example but not limited to (i) exceeding a number of copies, (ii) exceeding a number of users, (iii) passage of a period of time, (iv) advancement to a particular date or other numeral, or (v) use of a certain feature; or (b) would enable an unauthorized person to cause such result; or (c) would enable an unauthorized person to access another person's information without such other person's knowledge and permission.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">Username Security:</h3>
                <p>
                  You may not use your username and password for any unauthorized purpose.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">Information Retention:</h3>
                <p>
                  The ITL Conference and Organizers may retain and use, information collected in your use of the Service, provided such information does not individually identify you.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">Termination Rights:</h3>
                <p>
                  The ITL Conference or Organizers may terminate your access to our Site or the Service for any reason at any time. The provisions that by their nature are designed to survive termination or expiration of this Agreement shall survive termination or expiration of this Agreement or your access to our Site or Service.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">Governing Law:</h3>
                <p>
                  By using this Site, you signify your assent to these terms of use and agree to comply with all applicable laws and regulations, including Canada's export and re-export control laws and regulations, copyright laws and other laws regarding intellectual property. If you do not agree to these terms of use, please do not use the Site. This Site is controlled and operated by The ITL Conference from Alberta, Canada. You agree that your use of the Site and these Terms and Conditions are governed by the laws of the Province of Alberta, Canada without giving effect to any principles of conflict of law and notwithstanding your domicile, residence, or physical location. You agree that any dispute, difference, controversy or claim between us or by either of us against the other or the employees, agents, mandataries, officers, directors, successors, assigns or affiliates of the other, arising out of, relating to, or having any connection with, the present terms, this Site, any use of this Site and any transaction conducted on or from it (whether contractual or extra-contractual, in contract or tort, pursuant to statute or regulation, or otherwise, and whether pre-existing, present or future), including any question regarding negotiation, formation, existence, validity, performance, effects, interpretation, breach, resolution or annulment and further including the applicability or scope of this clause shall be brought exclusively in a court of competent jurisdiction in Alberta, Canada. You waive any and all objections to the exercise of jurisdiction over you by such courts and to the venue of such courts. We have made all reasonable attempts to comply with all legal requirements known to us in creating and maintaining the Site but make no representation that any materials or content on the Site are necessarily acceptable, appropriate or available in any jurisdiction. If you choose to access the Site from any location other than Canada or the United States of America, you do so of your own volition and you are solely responsible for complying with any applicable local laws. If any part of these Terms and Conditions are invalid or unenforceable for any reason whatsoever under applicable law, the invalid or unenforceable provision shall be deemed severable from these Terms and Conditions and shall not affect the validity or enforceability of any remaining provisions.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">Government Use Restrictions:</h3>
                <p>
                  The materials on this Site are provided with "Restricted Rights." Use, duplication, or disclosure by the Government is subject to restrictions as set forth in applicable laws and regulations. Use of the materials by the Government constitutes acknowledgment of the ITL Conference's or Organizers' proprietary rights in them.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">Disclaimer of Warranties:</h3>
                <p>
                  THE MATERIALS, CONTENT ON THIS SITE AND SERVICES ARE PROVIDED "AS IS", "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND EITHER EXPRESS OR IMPLIED. THE ITL CONFERENCE AND ORGANIZERS SHALL HAVE NO RESPONSIBILITY OR LIABILITY FOR ANY CONTENT, MATERIALS POSTED ON THE SITE OR SERVICES. THE ITL CONFERENCE AND ORGANIZERS MAKE NO GUARANTEES AS TO UPTIME OR AVAILABILITY OF THE SERVICE. TO THE FULLEST EXTENT POSSIBLE PURSUANT TO THE APPLICABLE LAW, THE ITL CONFERENCE AND ORGANIZERS DISCLAIM ALL WARRANTIES, EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NONINFRINGEMENT OR OTHER VIOLATION OF RIGHTS. THE SERVICE MAY BE SUBJECT TO LIMITATIONS, DELAYS, AND OTHER PROBLEMS INHERENT IN THE USE OF THE INTERNET AND ELECTRONIC COMMUNICATIONS. THE ITL CONFERENCE AND ORGANIZERS ARE NOT RESPONSIBLE FOR ANY DELAYS, DELIVERY FAILURES, OR OTHER DAMAGE RESULTING FROM SUCH PROBLEMS, INCLUDING INTERNET CONGESTION, VIRUS ATTACKS, AND DENIAL OF SERVICE (DOS) ATTACKS.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">Limitation of Liability:</h3>
                <p>
                  UNDER NO CIRCUMSTANCES, INCLUDING, BUT NOT LIMITED TO, NEGLIGENCE, SHALL THE ITL CONFERENCE, ORGANIZERS, OR EITHER OF THEIR THIRD PARTY LICENSORS OR PARTIES BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES, INCLUDING, BUT NOT LIMITED TO, LOSS OF DATA OR PROFIT, ARISING OUT OF THE USE, OR THE INABILITY TO USE, THE MATERIALS ON THIS SITE OR THE SERVICE, EVEN IF THE ITL CONFERENCE OR/AND ORGANIZERS HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES AND NOTWITHSTANDING THE FAILURE OF ESSENTIAL PURPOSE OF ANY REMEDY. THE ITL CONFERENCE, ORGANIZERS AND EACH OF THEIR LICENSORS' AND THIRD PARTIES ENTIRE AND AGGREGATE LIABILITY, WHETHER BASED IN CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY OR OTHERWISE, SHALL NOT EXCEED $100, EVEN IF THE ITL CONFERENCE OR ORGANIZERS HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES AND NOTWITHSTANDING THE FAILURE OF ESSENTIAL PURPOSE OF ANY REMEDY. IF YOUR USE OF MATERIALS FROM THIS SITE OR THE SERVICE RESULTS IN THE NEED FOR SERVICING, REPAIR OR CORRECTION OF EQUIPMENT OR DATA, YOU ASSUME ANY COSTS THEREOF. SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">Entire Agreement:</h3>
                <p>
                  This Agreement shall constitute the entire agreement between the parties regarding the subject matter hereof and supersede all proposals and prior discussions and writings between the parties with respect thereto. No failure or delay in enforcing any right or exercising any remedy will be deemed a waiver of any right or remedy. Each provision of this Agreement is a separately enforceable provision. If any provision of this Agreement is determined to be or becomes unenforceable or illegal, such provision shall be reformed to the minimum extent necessary in order for this Agreement to remain in effect in accordance with its terms as modified by such reformation. You shall not assign or transfer this Agreement without the prior written consent of the ITL Conference and/or Organizers. Any attempt to assign or transfer this Agreement by you shall be void.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-3">Injunctive Relief:</h3>
                <p>
                  The ITL Conference and its affiliates shall have the right to seek and obtain any injunctive, provisional or interim relief from any court of competent jurisdiction to protect its trademark or other intellectual property rights or confidential information.
                </p>
              </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Section B Accordion */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection('B')}
                className="w-full bg-primary-600 text-white px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-between hover:bg-primary-700 transition-colors rounded-t-lg"
                aria-expanded={openSections.B}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-left">
                  B. Conference Cancellation & Refund Policy
                </h2>
                <motion.div
                  animate={{ rotate: openSections.B ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openSections.B ? "auto" : 0,
                  opacity: openSections.B ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-white border border-t-0 border-neutral-200 rounded-b-lg p-6 sm:p-8">
                  <div className="space-y-6 text-neutral-700 leading-relaxed">
                    <p>
                      Cancellations can be made up to March 3, 2026 @ 12noon EST. All cancellations must be received by email to registration@itlconference.ca and are subject to a $50 administration fee. No credits or refunds will be given for cancellations received after March 3, 2026 @ 12 noon EST. There will be no refunds for "no-show" registrants.
                    </p>

                    <p>
                      The ITL Conference reserves the right to cancel an event or any associated functions at its sole discretion. In the event of such, a full refund will be made. The ITL Conference expressly excludes any liability for any direct or indirect losses or damages howsoever arising because of such cancellation and will not, for example, be responsible for any travel or accommodation costs incurred.
                    </p>

                    <p>
                      In the event of cancellation, the ITL Conference will use reasonable endeavours to alert those who have booked to attend an event and details of any cancellation will be posted on the conference website page. Attendees are responsible for checking this information prior to the event.
                    </p>

                    <p>
                      In exceptional circumstances other refund arrangements may be considered and will be to the sole discretion of the ITL Conference.
                    </p>

                    <p>
                      Registrant name substitutions are allowed up to March 14, 2026. Please email registration@itlconference.ca with the replacement contact's information.
                    </p>

                    <p>
                      No liability is assumed by the ITL Conference for changes to the program date, content, speakers, venues, or cancellation of the event. Refunds will not be issued for weather related cancellations.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Section C Accordion */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection('C')}
                className="w-full bg-primary-600 text-white px-6 sm:px-8 py-4 sm:py-6 flex items-center justify-between hover:bg-primary-700 transition-colors rounded-t-lg"
                aria-expanded={openSections.C}
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-left">
                  C. Photography Consent & Policy
                </h2>
                <motion.div
                  animate={{ rotate: openSections.C ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openSections.C ? "auto" : 0,
                  opacity: openSections.C ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-white border border-t-0 border-neutral-200 rounded-b-lg p-6 sm:p-8">
                  <div className="space-y-6 text-neutral-700 leading-relaxed">
                    <p>
                      <strong>1.</strong> By registering and attending the ITL Conference 2026, you acknowledge and consent to being photographed and/or recorded. This may include photographs, video recordings, and audio recordings that may be used for promotional purposes, including but not limited to:
                    </p>

                    <ul className="list-disc pl-6 space-y-2">
                      <li>Conference materials (brochures, newsletters, websites)</li>
                      <li>Social media posts</li>
                      <li>Press releases</li>
                      <li>Future event promotions</li>
                    </ul>

                    <p>
                      The images and videos captured during the event will be used solely for promotional purposes related to the ITL Conference and its partner organizations. We will not sell or distribute these materials for commercial use without prior consent.
                    </p>

                    <p>
                      In the event of cancellation, the ITL Conference will use reasonable endeavours to alert those who have booked to attend an event and details of any cancellation will be posted on the conference website page. Attendees are responsible for checking this information prior to the event.
                    </p>

                    <p>
                      If you prefer not to be photographed or recorded, please inform the event staff upon arrival, and we will ensure that you are not included in any media captured during the conference. Additionally, we encourage you to remain in areas designated as photography-free zones (if applicable).
                    </p>

                    <p>
                      For any questions or concerns regarding this policy, please contact us at{" "}
                      <a href="mailto:info@itlconference.ca" className="text-primary-600 hover:text-primary-700 underline">
                        info@itlconference.ca
                      </a>.
                    </p>

                    <div className="bg-primary-50 p-4 rounded-lg border-l-4 border-primary-600">
                      <p className="font-semibold text-neutral-900">
                        Acknowledgment: By attending the ITL Conference 2026, you agree to the foregoing terms and conditions.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
