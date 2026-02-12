/**
 * ContentCraft - Product Page
 * Copyright (c) 2025 Sixsmith Games. All rights reserved.
 */

'use client';

import Link from 'next/link';
import ModernBackground from '@/components/ModernBackground';
import SubscribeButton from '@/components/SubscribeButton';

export default function ContentCraftPage() {
  const painPoints = [
    {
      title: 'The Consistency Nightmare',
      problem: 'AI tools have no memory. Every generation is isolated, leading to contradictions.',
      solution: 'Built-in canon management tracks every NPC, location, and item automatically.',
    },
    {
      title: 'The Stat Block Hell',
      problem: 'Copy-pasting and formatting AI-generated stat blocks takes forever.',
      solution: 'Native D&D 5e support generates properly formatted, balanced stat blocks instantly.',
    },
    {
      title: 'The Relationship Web',
      problem: 'Creating interconnected NPCs manually becomes a spreadsheet nightmare.',
      solution: 'Automatic relationship generation creates natural social networks.',
    },
  ];

  const features = [
    {
      title: 'AI-Powered D&D Content Generation',
      description: 'Generate complete D&D 5e NPCs, monsters, locations, and encounters in seconds.',
    },
    {
      title: 'Canon Management & Consistency Engine',
      description: 'Automatic tracking of characters, locations, items, and relationships.',
    },
    {
      title: 'Relationship & Connection Mapping',
      description: 'NPCs automatically know each other and create living social networks.',
    },
    {
      title: 'Multi-AI Provider Support',
      description: 'Use OpenAI, Anthropic Claude, or Google Gemini—your choice.',
    },
    {
      title: 'Version History & Change Tracking',
      description: 'See every edit, roll back mistakes, and track content evolution.',
    },
    {
      title: 'Fact-Checking & Source Verification',
      description: 'Flag uncertain claims, verify facts, and track sources.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f43f5e 100%)',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <ModernBackground />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(100px)',
          zIndex: 2
        }} />
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 3}}>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center'}}>
            <div>
              <div style={{
                display: 'inline-block',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                padding: '0.5rem 1.5rem',
                borderRadius: '50px',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.3)'
              }}>
                ✨ AI CONTENT ENGINE
              </div>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 7vw, 4rem)',
                fontWeight: '900',
                color: 'white',
                marginBottom: '1.5rem',
                textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                lineHeight: '1.1'
              }}>
                Stop Fighting Your AI. Start Creating Your World.
              </h1>
              <p style={{
                fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)',
                color: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '2rem',
                textShadow: '0 2px 10px rgba(0,0,0,0.2)'
              }}>
                ContentCraft is the AI-powered content engine for game masters and authors who need more than
                scattered chat messages. Generate D&D content that actually fits together, track canon automatically,
                and never contradict yourself again.
              </p>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <Link
                  href="/pricing"
                  style={{
                    background: 'white',
                    color: '#a855f7',
                    padding: '1rem 2.5rem',
                    borderRadius: '50px',
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    textDecoration: 'none',
                    display: 'inline-block',
                    textAlign: 'center',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                    transition: 'all 0.3s ease',
                    maxWidth: '220px'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 15px 50px rgba(0,0,0,0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.3)';
                  }}
                >
                  Start Creating
                </Link>
              </div>
            </div>
            <div style={{
              background: 'white',
              borderRadius: '30px',
              padding: '2.5rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
              border: '2px solid rgba(168, 85, 247, 0.2)'
            }}>
              <h3 style={{fontSize: '1.75rem', fontWeight: '800', color: '#1a202c', marginBottom: '1.5rem'}}>
                From Idea to Stat Block in 60 Seconds
              </h3>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div style={{background: '#faf5ff', padding: '1rem', borderRadius: '10px', borderLeft: '4px solid #a855f7'}}>
                  <p style={{fontWeight: '600', color: '#6b21a8', marginBottom: '0.25rem'}}>ChatGPT Approach:</p>
                  <p style={{fontSize: '0.875rem', color: '#4b5563'}}>45 minutes of generating, formatting, balancing, and organizing</p>
                </div>
                <div style={{background: '#f0fdf4', padding: '1rem', borderRadius: '10px', borderLeft: '4px solid #22c55e'}}>
                  <p style={{fontWeight: '600', color: '#166534', marginBottom: '0.25rem'}}>ContentCraft Approach:</p>
                  <p style={{fontSize: '0.875rem', color: '#4b5563'}}>5 minutes: generate → done. Complete stat block, balanced and ready.</p>
                </div>
                <p style={{textAlign: 'center', fontWeight: '700', fontSize: '1.5rem', color: '#a855f7', marginTop: '0.5rem'}}>
                  Save 75% of prep time
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section style={{padding: '80px 0', background: 'white'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: '800',
              color: '#1a202c',
              marginBottom: '1rem'
            }}>
              Creating Consistent D&D Content Shouldn't Feel Like a Part-Time Job
            </h2>
            <p style={{fontSize: 'clamp(1.125rem, 2.5vw, 1.5rem)', color: '#6b7280', maxWidth: '900px', margin: '0 auto'}}>
              You open ChatGPT. Copy. Paste. Format. Fix stat math. Cross-reference your wiki. Realize the new
              NPC contradicts the old NPC. Start over. Six hours later, you've made three NPCs and a headache.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {painPoints.map((point, index) => (
              <div key={index} style={{
                background: 'linear-gradient(135deg, #faf5ff 0%, #fce7f3 100%)',
                borderRadius: '20px',
                padding: '2.5rem',
                border: '2px solid #e9d5ff'
              }}>
                <h3 style={{fontSize: '1.25rem', fontWeight: '700', color: '#1a202c', marginBottom: '1.5rem'}}>
                  {point.title}
                </h3>
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                  <div>
                    <p style={{fontSize: '0.875rem', fontWeight: '600', color: '#dc2626', marginBottom: '0.25rem'}}>
                      Problem:
                    </p>
                    <p style={{color: '#4b5563'}}>{point.problem}</p>
                  </div>
                  <div>
                    <p style={{fontSize: '0.875rem', fontWeight: '600', color: '#16a34a', marginBottom: '0.25rem'}}>
                      Solution:
                    </p>
                    <p style={{color: '#4b5563'}}>{point.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{padding: '80px 0', background: '#f8f9fa'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: '#1a202c', marginBottom: '1rem'}}>
              From Idea to Playable Content in Three Steps
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{background: 'white', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', textAlign: 'center'}}>
              <div style={{
                background: '#f3e8ff',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#a855f7'
              }}>
                1
              </div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '700', color: '#1a202c', marginBottom: '1rem'}}>
                Describe What You Need
              </h3>
              <p style={{color: '#6b7280', fontStyle: 'italic', marginBottom: '0.5rem'}}>
                "I need a gruff blacksmith in Waterdeep who used to adventure with the party's cleric"
              </p>
            </div>

            <div style={{background: 'white', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', textAlign: 'center'}}>
              <div style={{
                background: '#f3e8ff',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#a855f7'
              }}>
                2
              </div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '700', color: '#1a202c', marginBottom: '1rem'}}>
                AI Generates Structured Content
              </h3>
              <ul style={{color: '#6b7280', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.25rem'}}>
                <li>✓ Full stat block (CR-appropriate)</li>
                <li>✓ Personality & background</li>
                <li>✓ Relationships to other NPCs</li>
                <li>✓ Plot hooks and secrets</li>
                <li>✓ VTT-ready format</li>
              </ul>
            </div>

            <div style={{background: 'white', borderRadius: '20px', padding: '2.5rem', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', textAlign: 'center'}}>
              <div style={{
                background: '#f3e8ff',
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#a855f7'
              }}>
                3
              </div>
              <h3 style={{fontSize: '1.25rem', fontWeight: '700', color: '#1a202c', marginBottom: '1rem'}}>
                Edit, Use, Expand
              </h3>
              <ul style={{color: '#6b7280', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.25rem'}}>
                <li>✓ Tweak anything you want</li>
                <li>✓ Export to your VTT</li>
                <li>✓ Generate related content</li>
                <li>✓ Everything stays connected</li>
              </ul>
            </div>
          </div>

          <p style={{textAlign: 'center', fontSize: '1.25rem', fontWeight: '600', color: '#a855f7', marginTop: '3rem'}}>
            No copy-paste. No reformatting. No continuity nightmares.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section style={{padding: '80px 0', background: 'white'}}>
        <div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 2rem'}}>
          <div style={{textAlign: 'center', marginBottom: '3rem'}}>
            <h2 style={{fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: '800', color: '#1a202c', marginBottom: '1rem'}}>
              Key Features
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {features.map((feature, index) => (
              <div key={index} style={{
                background: 'white',
                borderRadius: '15px',
                padding: '2rem',
                border: '2px solid #e9d5ff',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#a855f7';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(168, 85, 247, 0.15)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = '#e9d5ff';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <h3 style={{fontSize: '1.125rem', fontWeight: '700', color: '#1a202c', marginBottom: '0.5rem'}}>
                  {feature.title}
                </h3>
                <p style={{color: '#6b7280'}}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '100px 0',
        background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f43f5e 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.1)'
        }} />
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: '0 2rem',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: '800',
            color: 'white',
            marginBottom: '1.5rem',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)'
          }}>
            Stop Spending 6 Hours on Session Prep
          </h2>
          <p style={{
            fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
            color: 'rgba(255, 255, 255, 0.95)',
            marginBottom: '2.5rem',
            textShadow: '0 2px 10px rgba(0,0,0,0.2)'
          }}>
            Join game masters and authors who've transformed their content creation workflow.
          </p>
          <SubscribeButton style={{
            background: 'white',
            color: '#a855f7',
            padding: '1.25rem 3rem',
            borderRadius: '50px',
            fontSize: '1.25rem',
            fontWeight: '700',
            textDecoration: 'none',
            display: 'inline-block',
            boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease',
            border: 'none',
            cursor: 'pointer'
          }}>
            Start Creating with ContentCraft
          </SubscribeButton>
        </div>
      </section>
    </div>
  );
}
