"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Shield, ChevronDown } from "lucide-react";
import Image from "next/image";

export default function PrivacyPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1, margin: "-100px" });
  const [openSections, setOpenSections] = useState({ 
    Introduction: true, 
    PersonalInformation: false,
    WhyWeCollect: false,
    WhatInformation: false,
    Cookies: false,
    HowWeUse: false,
    HowWeProtect: false,
    DataRetention: false,
    PrivacyUpdates: false,
    HowToContact: false
  });

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
            alt="Privacy Policy"
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
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </motion.div>
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Privacy Policy
              </motion.h1>
              <motion.p
                className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                How we collect, use, and protect your information
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content Section */}
      <section className="py-16 sm:py-20 md:py-24 bg-white" ref={ref}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-none"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Introduction Accordion */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection('Introduction')}
                className="w-full bg-primary-600 text-white px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between hover:bg-primary-700 transition-all duration-300 rounded-lg shadow-md"
                aria-expanded={openSections.Introduction}
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-left">
                  Introduction
                </h2>
                <motion.div
                  animate={{ rotate: openSections.Introduction ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openSections.Introduction ? "auto" : 0,
                  opacity: openSections.Introduction ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-neutral-50 border-x border-b border-neutral-200 rounded-b-lg p-6 sm:p-8 mt-2">
                  <div className="space-y-5 text-neutral-700 leading-relaxed text-base sm:text-lg">
                    <p>
                      The ITL Conference ("We" or "Our") and its Affiliates (as such term is defined in the Terms and Conditions located at{" "}
                      <a href="https://www.itlconference.ca/terms" className="text-primary-600 hover:text-primary-700 underline">
                        https://www.itlconference.ca/terms
                      </a>
                      ) respect your privacy and this policy (the "Privacy Policy") describes how we are committed to protecting your personal information. When you use https://www.itlconference.ca, and any existing or future related websites, including websites of Affiliates (the "Site"), we may collect, store, use and disclose information about you in accordance with this privacy policy. This policy describes in detail how we collect, store, use and protect any information you provide to us and describes the following:
                    </p>

                    <ul className="list-disc pl-6 space-y-2">
                      <li>Why we collect your personal information.</li>
                      <li>What information is collected by The ITL Conference.</li>
                      <li>How we use and store your information.</li>
                      <li>How we may share information.</li>
                      <li>How to contact The ITL Conference.</li>
                    </ul>

                    <p>
                      You may visit our Site without identifying yourself or providing any personal information. In certain circumstances, we may also ask you to provide us with certain personal information for the purposes set out in this Privacy Policy or to access certain functions of the Site.
                    </p>

                    <p>
                      At The ITL Conference, you decide how we communicate with you. We respond to your customer inquiries using the contact details you have provided to us. We may send you promotional material by various communication channels. This Privacy Policy explains how you can choose how we communicate with you.
                    </p>

                    <p>
                      Please read this policy carefully to understand our policies and practices for collecting, processing, and storing your information. If you do not agree with our policies and practices, do not download, register with, access or use our Site. By downloading, registering with, accessing or using the Site, you indicate that you understand, accept, and consent to the practices described in this Privacy Policy. This Privacy Policy may change from time to time. Your continued use of our Site after we make changes indicates that you accept and consent to those changes, so please check the policy periodically for updates.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Personal Information Accordion */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection('PersonalInformation')}
                className="w-full bg-primary-600 text-white px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between hover:bg-primary-700 transition-all duration-300 rounded-lg shadow-md"
                aria-expanded={openSections.PersonalInformation}
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-left">
                  Personal Information
                </h2>
                <motion.div
                  animate={{ rotate: openSections.PersonalInformation ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openSections.PersonalInformation ? "auto" : 0,
                  opacity: openSections.PersonalInformation ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-neutral-50 border-x border-b border-neutral-200 rounded-b-lg p-6 sm:p-8 mt-2">
                  <div className="space-y-5 text-neutral-700 leading-relaxed text-base sm:text-lg">
                    <p>
                      We will only use your personal information in accordance with this policy unless otherwise required by applicable law. We take steps to ensure that the personal information that we collect about you is adequate, relevant, not excessive, and used for limited purposes. Privacy laws in Canada generally define 'personal information' as any information about an identifiable individual, which includes information that can be used on its own or with other information to identify, contact, or locate a single person. Personal information does not include business contact information, including your name, title, or business contact information.
                    </p>

                    <p>
                      Do not provide or send any personal information (particularly financial or credit card information) that is requested of you through an unsolicited email or phone call that appears to be from The ITL Conference or its Affiliates. We will not contact you to request such information; we will only request such information from you when completing an order through the Site.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Why We Collect Your Personal Information Accordion */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection('WhyWeCollect')}
                className="w-full bg-primary-600 text-white px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between hover:bg-primary-700 transition-all duration-300 rounded-lg shadow-md"
                aria-expanded={openSections.WhyWeCollect}
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-left">
                  Why We Collect Your Personal Information
                </h2>
                <motion.div
                  animate={{ rotate: openSections.WhyWeCollect ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openSections.WhyWeCollect ? "auto" : 0,
                  opacity: openSections.WhyWeCollect ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-neutral-50 border-x border-b border-neutral-200 rounded-b-lg p-6 sm:p-8 mt-2">
                  <div className="space-y-5 text-neutral-700 leading-relaxed text-base sm:text-lg">
                    <p>
                      We collect your information in order to provide you with a more personalized, convenient, secure, and enjoyable conference experience, and for any other purpose set out in this Privacy Policy. We may retain some of your personal information in order to provide you with a personalized welcome and user experience during subsequent visits. We may also ask you to provide us with certain information online in order to fulfill our legal and contractual obligations. Additionally, the collection of your personal information allows us to help detect and address illegal activity or other objectionable conduct online.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* What Information Is Collected by The ITL Conference Accordion */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection('WhatInformation')}
                className="w-full bg-primary-600 text-white px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between hover:bg-primary-700 transition-all duration-300 rounded-lg shadow-md"
                aria-expanded={openSections.WhatInformation}
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-left">
                  What Information Is Collected by The ITL Conference
                </h2>
                <motion.div
                  animate={{ rotate: openSections.WhatInformation ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openSections.WhatInformation ? "auto" : 0,
                  opacity: openSections.WhatInformation ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-neutral-50 border-x border-b border-neutral-200 rounded-b-lg p-6 sm:p-8 mt-2">
                  <div className="space-y-5 text-neutral-700 leading-relaxed text-base sm:text-lg">
                    <p>
                      We receive and may retain various information that you voluntarily provide to us during a visit to our Site, in an application for employment with us, in correspondence when you contact us, or any other information or preference that you provide to us for the purposes set out in this Privacy Policy. This information may include the following:
                    </p>

                    <ul className="list-disc pl-6 space-y-2">
                      <li>Your name, address (including postal code), and telephone number;</li>
                      <li>Your location;</li>
                      <li>Your email address;</li>
                      <li>Your IP address;</li>
                      <li>Photos or videos in which you appear;</li>
                      <li>Proof of identity;</li>
                      <li>Payment and billing information for purposes of completing an order;</li>
                      <li>Any other information that you agree to communicate to us through our Site or by other means.</li>
                    </ul>

                    <p>
                      For purposes set out in this Privacy Policy, or any other purpose which you consent to, we may collect and use real-time information about your device's location. If you block, disable, or otherwise disallow the use of location or tracking technologies on your device, the Site may be inaccessible or certain functions may become unavailable. We may also receive information about you from other sources in accordance with applicable privacy laws, including but not limited to up-to-date information about your address or any other applicable information. This information may help us enhance your conference user experience.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Cookies and Other Technologies Accordion */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection('Cookies')}
                className="w-full bg-primary-600 text-white px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between hover:bg-primary-700 transition-all duration-300 rounded-lg shadow-md"
                aria-expanded={openSections.Cookies}
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-left">
                  Cookies and Other Technologies
                </h2>
                <motion.div
                  animate={{ rotate: openSections.Cookies ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openSections.Cookies ? "auto" : 0,
                  opacity: openSections.Cookies ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-neutral-50 border-x border-b border-neutral-200 rounded-b-lg p-6 sm:p-8 mt-2">
                  <div className="space-y-5 text-neutral-700 leading-relaxed text-base sm:text-lg">
                    <p>
                      When you visit our Site or communicate with us, we and our third-party service providers may use technological tools that automatically collect information about how you access, navigate, and leave our Site. For example, we collect information about what other website you have visited before ours, what type of browser and operating system you use, the IP address from which you visit the Site, the pages you visit, and the website you visit when leaving ours. In general, we do not link this type of information to your personal information unless we are investigating the security of our Site.
                    </p>

                    <p>
                      Some of our general and promotional communications use cookies, pixel files, and other digital markers. A cookie is a small data file transmitted to your computer by web servers, which allows you to track your browser activity while you are visiting our Site. This information tells us how you use our Site, how we could improve the design and content, and how we could provide you with a better user experience. We do not use cookies to access personal files on your personal device.
                    </p>

                    <p>
                      Our Site may use pixel files and cookies to administer our online promotional programs. Pixel files and cookies can keep track of your browser so that you can be recognized when you visit other websites. We also use pixel files to find out if you open the promotional communications we send to you. Generally, these pixel files are of limited duration and come from our ad management service providers who may use these pixel files and cookies to load an advertisement from The ITL Conference or its Affiliates when you visit certain other third-party websites. We do not control these third parties' tracking technologies or how they use them. If you have any questions about an advertisement or other targeted content, you should contact the responsible provider directly.
                    </p>

                    <p>
                      This Site uses Google Analytics, a web analytics service provided by Google, Inc. Google Analytics uses cookies to allow us to analyze how users use the Site. The information generated by the cookie in relation to your use of the Site (including your IP address) is transmitted to Google, who stores it on its servers. Google may use this information to evaluate your use of the Site, to compile reports on Site activity for website or app operators, and to provide other services relating to Site activity and marketing. Google may also transfer this information to third parties when required by law or when these third parties process the information on its behalf. You can refuse the use of cookies by modifying the appropriate settings in your browser; note, however, that if you disable the use of cookies, some areas of the Site may not be accessible or function adequately.
                    </p>

                    <p>
                      If you prefer not to accept cookies, most browsers will allow you (i) to change their settings so that you are notified each time you receive a cookie, which allows you to decide whether or not to accept it, (ii) delete existing cookies, and (iii) configure your browser to automatically refuse all cookies. You may also opt out network advertising programs that track your activities across multiple websites to deliver targeted advertising to you. Please see the "Understanding Online Advertising" and "Online Behavioral Advertising Opt-Out" pages on the Digital Advertising Alliance of Canada website and the Network Advertising Initiative's Ad Opt-Out page. The aforementioned websites offer tools to find out if The ITL Conference or its Affiliates may have cookies in your browser and how to remove them. You will continue to receive other types of advertising from member companies, but they will not be based on your interests. Since deleting cookies from a browser may remove your opt-out preferences, you should use these tools regularly to ensure that your preferences are up to date.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* How We Use Your Personal Information Accordion */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection('HowWeUse')}
                className="w-full bg-primary-600 text-white px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between hover:bg-primary-700 transition-all duration-300 rounded-lg shadow-md"
                aria-expanded={openSections.HowWeUse}
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-left">
                  How We Use Your Personal Information
                </h2>
                <motion.div
                  animate={{ rotate: openSections.HowWeUse ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openSections.HowWeUse ? "auto" : 0,
                  opacity: openSections.HowWeUse ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-neutral-50 border-x border-b border-neutral-200 rounded-b-lg p-6 sm:p-8 mt-2">
                  <div className="space-y-5 text-neutral-700 leading-relaxed text-base sm:text-lg">
                    <p>
                      We may use the information we obtain about you to:
                    </p>

                    <ul className="list-disc pl-6 space-y-2">
                      <li>To create and maintain your account and provide you with access to our Site.</li>
                      <li>Provide you with the Sites and other services that you request.</li>
                      <li>Manage your participation in events hosted on the Sites, where you have signed up for such events and promotions.</li>
                      <li>Maintain a record of the events in which you participate, including chat and webinar history and download activity.</li>
                      <li>Enable you to interact with other event participants.</li>
                      <li>Provide administrative notices or communications applicable to your use of the Sites.</li>
                      <li>Operate, evaluate, and improve our business and the products and services we offer.</li>
                      <li>Analyze and enhance our marketing communications and strategies.</li>
                      <li>Analyze trends and statistics regarding visitors' use of our Sites.</li>
                      <li>Maintain the quality of the Sites, including detecting security incidents and protecting against malicious activities.</li>
                      <li>Notify you about relevant products and services operated by the ITL Conference.</li>
                      <li>Enforce our Sites' Terms of Use and legal rights.</li>
                      <li>Comply with applicable legal requirements and industry standards and policies.</li>
                    </ul>

                    <p>
                      We also use non-personally identifiable information and certain technical information about your computer and your access to the Sites (including your internet protocol address) in order to operate, maintain and manage the Sites.
                    </p>

                    <p>
                      We may collect, compile, store, publish, promote, report, share or otherwise disclose or use any and all aggregated information, however, unless otherwise disclosed in this policy, we will not sell or otherwise transfer or disclose your Personal Information to a third party without your consent. Our customers may use the ITL Conference and a "Customer Site" to process data, and this data may contain your personal information. The data that we process through the Sites in that case is processed on behalf of our customer, and our privacy practices are governed by the contracts that we have in place with our customers. If you have any questions or concerns about how personal information in such data is handled or would like to exercise your rights, you should contact the person or entity (i.e., the data controller) who has contracted with us to use the Customer Site to process this data. Our customers, and sometimes a "Third Party", as described above, control the Personal Information in such a case. We will provide assistance to our customers to address your concerns in accordance with the terms of our contract with them.
                    </p>

                    <p>
                      If we seek to use the information we obtain about you in other ways, we will provide specific notice and request your consent at the time of collection. The ITL Conference would like to send you information of products or services of ours that we think you might like. If you have agreed to receive marketing, you may always opt out at a later date. You have the right at any time to stop the ITL Conference from contacting you for marketing purposes. If you no longer wish to be contacted for marketing purposes, you may unsubscribe here. If you opt out of our marketing, you may still receive transactional emails from the ITL Conference in connection with your use of the Sites. You will also continue to receive marketing in connection with a Customer Site until you specifically opt out of such marketing.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* How the ITL Conference Protects and Stores Your Personal Information Accordion */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection('HowWeProtect')}
                className="w-full bg-primary-600 text-white px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between hover:bg-primary-700 transition-all duration-300 rounded-lg shadow-md"
                aria-expanded={openSections.HowWeProtect}
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-left">
                  How the ITL Conference Protects and Stores Your Personal Information
                </h2>
                <motion.div
                  animate={{ rotate: openSections.HowWeProtect ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openSections.HowWeProtect ? "auto" : 0,
                  opacity: openSections.HowWeProtect ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-neutral-50 border-x border-b border-neutral-200 rounded-b-lg p-6 sm:p-8 mt-2">
                  <div className="space-y-5 text-neutral-700 leading-relaxed text-base sm:text-lg">
                    <p>
                      Your personal information is kept confidential. They are stored and processed on our computers located in Canada and maintained by our third-party service providers. Your personal information is subject to the laws of those jurisdictions, including laws that allow access to it for law enforcement purposes. These laws may differ from the laws of your jurisdiction of residence. We use administrative, procedural, and technical measures to protect your information against loss or theft and against unauthorized access or disclosure in order to protect your privacy. These safeguards include firewalls and encryption.
                    </p>

                    <p>
                      The safety and security of your information also depend on you. Where we have given you (or you have chosen) a password for access to certain parts of the Site, you are responsible for keeping it confidential. We ask you not to share your password with anyone. We urge you to be careful about giving out information over the Internet or in your interaction and communication with others.
                    </p>

                    <p>
                      Unfortunately, the transmission of information via the Internet and mobile platforms is not completely secure. Although we do our best to protect your personal information, we cannot guarantee the security of your personal information transmitted through the Internet, third-party digital networks, websites, mobile devices, the Site, or any social media platforms. Any transmission of personal information is at your own risk. We are not responsible for circumvention of any Site privacy settings or security measures.
                    </p>

                    <p>
                      We cannot be held responsible for cases of fraud or theft over the Internet. Please be aware of this when providing information through the Site. By submitting your personal information or engaging with the Site, you consent to the transfer, storage, or processing of your personal information in accordance with this Privacy Policy.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Data Retention Accordion */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection('DataRetention')}
                className="w-full bg-primary-600 text-white px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between hover:bg-primary-700 transition-all duration-300 rounded-lg shadow-md"
                aria-expanded={openSections.DataRetention}
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-left">
                  Data Retention
                </h2>
                <motion.div
                  animate={{ rotate: openSections.DataRetention ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openSections.DataRetention ? "auto" : 0,
                  opacity: openSections.DataRetention ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-neutral-50 border-x border-b border-neutral-200 rounded-b-lg p-6 sm:p-8 mt-2">
                  <div className="space-y-5 text-neutral-700 leading-relaxed text-base sm:text-lg">
                    <p>
                      Except as otherwise permitted or required by applicable law or regulation, we will only retain your personal information for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements. Under some circumstances we may anonymize or aggregate your personal information so that it can no longer be associated with you. We reserve the right to use such anonymize and de-identified data for any legitimate business purpose without further notice to you or your consent. Your consent therefore remains valid after the end of our relationship with you.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Privacy Policy Updates Accordion */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection('PrivacyUpdates')}
                className="w-full bg-primary-600 text-white px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between hover:bg-primary-700 transition-all duration-300 rounded-lg shadow-md"
                aria-expanded={openSections.PrivacyUpdates}
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-left">
                  Privacy Policy Updates
                </h2>
                <motion.div
                  animate={{ rotate: openSections.PrivacyUpdates ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openSections.PrivacyUpdates ? "auto" : 0,
                  opacity: openSections.PrivacyUpdates ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-neutral-50 border-x border-b border-neutral-200 rounded-b-lg p-6 sm:p-8 mt-2">
                  <div className="space-y-5 text-neutral-700 leading-relaxed text-base sm:text-lg">
                    <p>
                      The ITL Conference keeps its policy under regular review and places any update on this web page. If we decide to make material changes to our Privacy Policy, we will notify you by prominently posting notice of the changes on the Site and updating the date at the top of the Privacy Policy. Therefore, we encourage you to check the date of our Privacy Policy whenever you visit the website for any updates or changes. We understand that changes to this Privacy Policy may affect your decision to use our Sites. You have the option to deactivate your account for any reason. Continued use of our Sites and their services following notice of such changes shall indicate your acknowledgment of such changes and agreement to be bound by the terms and conditions of such changes.
                    </p>

                    <p>
                      Continued use of our Sites and their services following notice of such changes shall indicate your acknowledgment of such changes and agreement to be bound by the terms and conditions of such changes.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* How to Contact the ITL Conference Accordion */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection('HowToContact')}
                className="w-full bg-primary-600 text-white px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between hover:bg-primary-700 transition-all duration-300 rounded-lg shadow-md"
                aria-expanded={openSections.HowToContact}
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-left">
                  How to Contact the ITL Conference
                </h2>
                <motion.div
                  animate={{ rotate: openSections.HowToContact ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 ml-4"
                >
                  <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openSections.HowToContact ? "auto" : 0,
                  opacity: openSections.HowToContact ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="bg-neutral-50 border-x border-b border-neutral-200 rounded-b-lg p-6 sm:p-8 mt-2">
                  <div className="space-y-5 text-neutral-700 leading-relaxed text-base sm:text-lg">
                    <p>
                      If you would like more information about our privacy policy or our personal information management practices or to request access to, correct, or delete any personal information that you have provided to us, please contact us by email at{" "}
                      <a href="mailto:info@itlconference.ca" className="text-primary-600 hover:text-primary-700 underline">
                        info@itlconference.ca
                      </a>
                      . We may not accommodate a request to change information if we believe the change would violate any law or legal requirement or cause the information to be incorrect. We may charge you a fee to access your personal information; however, we will notify you of any fee in advance.
                    </p>

                    <p>
                      We will provide access to your personal information, subject to exceptions set out in applicable privacy legislation. Examples of such exceptions include:
                    </p>

                    <ul className="list-disc pl-6 space-y-2">
                      <li>Information protected by solicitor-client privilege.</li>
                      <li>Information that is part of a formal dispute resolution process.</li>
                      <li>Information that is about another individual that would reveal their personal information or confidential commercial information.</li>
                      <li>Information that is prohibitively expensive to provide.</li>
                    </ul>

                    <p>
                      If you do not wish to receive promotional material from The ITL Conference or if you wish to review, verify, correct, or withdraw consent to the use of your personal information, please contact us by email. Please note that if you withdraw your consent, we may not be able to provide you with a particular product or service.
                    </p>
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

