import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { faqs } from '../data/mockData';

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(faqs.map(faq => faq.category)))];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#e8dac3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-playfair text-[#2e2e2e] mb-4 font-bold">
            Frequently Asked Questions
          </h1>
        </div>

        {/* Search and Filter */}
        <div className="bg-transparent rounded-lg border border-[#b08c57] p-2 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-transparent rounded-lg focus:outline-none"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent font-montserrat rounded-lg px-4 py-2 focus:outline-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <div key={faq.id} className="bg-transparent rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                className="w-full text-left p-2 transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="inline-block font-playfair bg-[#cdb694] text-[#ffffff] text-xs px-2 py-1 rounded-full mb-2">
                    {faq.category}
                  </span>
                  <h3 className="text-lg font-semibold font-montserrat text-gray-900">{faq.question}</h3>
                </div>
                {openFAQ === faq.id ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {openFAQ === faq.id && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No FAQs found matching your search.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="bg-[#2e2e2e] text-[#e8dac3] border-2 border-[#b08c57] hover:bg-[#e8dac3] hover:text-[#2e2e2e] transition-colors px-6 py-3 rounded-full font-Montserrat font-medium"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Contact Section */}
        <div className="bg-[#b4aa98] rounded-lg p-8 mt-12 text-center">
          <h2 className="text-2xl font-Montserrat font-semibold text-[#a3814f] mb-4">
            Still have questions?
          </h2>
          <p className="text-black mb-6">
            Can't find the answer you're looking for? Our customer support team is here to help.
          </p>
          <button className="bg-[#2e2e2e] text-[#e8dac3] border-2 border-[#b08c57] hover:bg-transparent hover:text-[#2e2e2e] transition-colors px-6 py-3 rounded-full font-Montserrat font-medium">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}