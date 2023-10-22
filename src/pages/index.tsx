import React, { useCallback, useRef } from "react";
import type { Engine, Container as ParticlesContainer } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Container, Row, Col } from 'react-bootstrap';
import AOS from "aos";
import styles from "../css/index.module.css";
import "aos/dist/aos.css";
import CustomCodeBlock, { Snippet } from '../components/CustomCodeBlock';
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Slider from "react-slick";
import { useEffect } from "react";
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

const sliders = [
  {
    title: "Code Assistant",
    imageSrc: <img alt="Code Assistant" src="/img/slides/vhdl.png" />,
    description: (
      <>
        OneWare Studio makes writing code as easy as possible. Multiple Features
        like code suggestions, autocorrection and error listing work together to
        help you program your Hardware in the most efficient way.
      </>
    )
  },
  {
    title: "Simulation",
    imageSrc: <img alt="Simulation" src="/img/slides/vcd.png" />,
    description: (
      <>
        For many tasks in hardware development it is very useful to simulate your program. 
        OneWare Studio offers excellent simulation integration, including a lightning fast, multi-threaded VCD Viewer and the most popular Simulation tools.
      </>
    )
  },
  {
    title: "Extensibility",
    imageSrc: <img alt="Extensible" src="/img/slides/extensions.png" />,
    description: (
      <>
        OneWare Studio is fully extensible, allowing to install custom languages, Hardware Support, new Toolchains or Simulators with one click.
        This makes our tool a very lightweight software that can be easily customized for your needs.
      </>
    )
  }
];

var tsp;

const App = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: ParticlesContainer | undefined) => {
    await console.log(container);
  }, []);

  const slickRef = useRef<Slider>(null);

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      AOS.init();
    }

    //Scroll
    document.addEventListener('scroll', debounce(storeScroll), { passive: true });

    // Update scroll position for first time
    storeScroll();

    document.documentElement.dataset.isindex = "1";
    return () => {
      // Anything in here is fired on component unmount.
      document.documentElement.dataset.isindex = "0";
    }
  });

  const debounce = (fn: Function) => {
    let frame: number;
    return (...params: any[]) => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      frame = requestAnimationFrame(() => {
        fn(...params);
      });
    }
  };

  const storeScroll = () => {
    document.documentElement.dataset.scroll = window.scrollY.toString();
  }

  return (
    <Layout
      title="OneWare Studio"
      description="One Extensible IDE for Hardware and Software Development"
    >
      <div className={classnames(styles.heroBackground)}>
        <Particles
          className={classnames("hideMobile", styles.particles)}
          canvasClassName={styles.particlesCanvas}
          loaded={particlesLoaded}
          init={particlesInit}
          options={{
            fullScreen: {
              enable: false
            },
            particles: {
              number: {
                value: 100,
                density: {
                  enable: true,
                  value_area: 1500
                }
              },
              line_linked: {
                enable: true,
                opacity: 0.1
              },
              move: {
                direction: "bottom",
                enable: true,
                outModes: {
                  default: "out"
                },
                size: true,
                speed: {
                  min: 0.2,
                  max: 0.4
                }
              },
              size: {
                value: 1.7
              },
              opacity: {
                anim: {
                  enable: true,
                  speed: 1,
                  opacity_min: 0.2
                }
              }
            },
            interactivity: {
              events: {
                onclick: {
                  enable: true,
                  mode: "push"
                },
                onhover: {
                  enable: true,
                  mode: "bubble"
                }
              },
              modes: {
                push: {
                  particles_nb: 1
                },
                bubble: {
                  size: 6,
                  distance: 44
                }
              }
            },
            detectRetina: true,
            fpsLimit: 120,
          }}
        />
        <header className={classnames("hero", styles.heroBanner)}>
          <Container>
            <div className={styles.heroLogo}>
              <img
                alt="OneWare Logo"
                src={"img/favicon.ico"}
                className={styles.heroLogoImage}
              />
            </div>

            <div className={styles.PromoSection}>
              <h1 className={styles.heroTitle}>OneWare Studio</h1>
              <p className={styles.heroSubtitle}>Powering the Future, One Chip at a Time!</p>
              <a target="_blank"
                className={classnames("button button--primary button--lg hideMobile", styles.heroButton)}
                href={"https://demo.oneware.studio"}>
                WEB DEMO
              </a>
              <Link
                className={classnames("button button--secondary button--outline button--lg", styles.heroButtonTwo, styles.heroButton)}
                to={"/docs/getstarted"}>
                GET STARTED
              </Link>
            </div>
          </Container>
        </header>
      </div>

      <main style={{ overflowX: "hidden" }}>
        {sliders && sliders.length && (
          <Container className="margin-vert--lg">
            <Slider
              ref={slickRef}
              dots={true}
              arrows={false}
              autoplaySpeed={20000}
              infinite={true}
              autoplay={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              beforeChange={(_c, n) => {
                var slideCount = sliders.length;
                for (var i = 0; i < slideCount; i++) {
                  var slide = document.getElementById("slide" + i);
                  if (slide) {
                    if (i == n) slide.classList.add(styles.activeslide ?? "");
                    else slide.classList.remove(styles.activeslide ?? "");
                  }
                }
              }}>

              {sliders.map(({ imageSrc, title, description }, idx) => (
                <div key={idx}>
                  {imageSrc}
                  <div className={classnames("hideDesktop", styles.slidecaption)}>
                    <h3>{title}</h3>
                    {description}
                  </div>
                </div>
              ))}
            </Slider>
            <Row className="margin-vert--xl hideMobile">
              {sliders.map(({ title, description }, idx) => (
                <Col
                  key={idx} onClick={() => slickRef.current?.slickGoTo(idx)}
                  className={classnames("col", "padding-vert--lg", styles.slidebutton)}
                  id={"slide" + idx}>
                  <h3>{title}</h3>
                  <span>{description}</span>
                </Col>
              ))}
            </Row>
          </Container>
        )}

        <div>
          <Container>
            <Row className="bottomsplit padding-vert--lg">
              <Col className="padding-vert--md mobileorder-1" data-aos="fade-right">
                <h1>What is Electrical Engineering?</h1>
                
Electrical Engineering is the invisible force that powers our modern world, driving technological innovation and ensuring our daily conveniences. It is the linchpin of power generation and distribution, supporting industries, homes, and infrastructure. Beyond that, it plays a pivotal role in shaping sustainable energy solutions, communication networks, and automation systems. As our society faces complex challenges in healthcare, environmental sustainability, and space exploration, Electrical Engineering continues to be at the forefront, providing the tools and expertise to tackle these pressing issues and pave the way for a brighter future.
              </Col>
              <Col className="padding-vert--md mobileorder-0" data-aos="fade-left">
                <img alt="About OneWare" className="margin-auto" src="/img/micro.png" />
              </Col>
            </Row>
            <Row className="padding-vert--lg" data-aos="fade-right">
              <Col className="padding-vert--md display-flex">
                <img alt="About OneWare" className="margin-auto" src="/img/graph.png" />
              </Col>
              <Col className="padding-vert--md" data-aos="fade-left">
                <h1>What is OneWare?</h1>
                <p>
                OneWare represents our innovative solution, merging FPGA and Microcontroller development into a unified platform, offering substantial assistance to electrical engineers

                  <Container style={{ overflowY: "hidden" }}>
                    <Row className="margin-top--md">
                      <Col className={styles.card} data-aos="fade-up" data-aos-delay="100">
                        <div className={styles.cardTitle}>OneWare Studio 💡</div>
                        <div className={styles.cardSubTitle}>OneWare Studio is a modern approach to make FPGA and Microcontroller Programming faster and more
                          beginner friendly.
                        </div>
                      </Col>
                      <Col className={styles.card} data-aos="fade-up" data-aos-delay="100">
                        <div className={styles.cardTitle}>Huge Compatibility 📑</div>
                        <div className={styles.cardSubTitle}>OneWare supports a wide range of programming languages and tools to program both FPGAs and Microcontroller
                        </div>
                      </Col>
                    </Row>
                    <Row className="margin-bottom--md">
                      <Col className={styles.card} data-aos="fade-up" data-aos-delay="100">
                        <div className={styles.cardTitle}>Plug&Play Hardware ⚡</div>
                        <div className={styles.cardSubTitle}>OneWare Studio supports the open CRUVI Standard. 
                        Modular CRUVI hardware and the visual integration in the IDE create a true Plug&Play experiance.
                        </div>
                      </Col>
                      <Col className={styles.card} data-aos="fade-up" data-aos-delay="100">
                        <div className={styles.cardTitle}>OneWare Learning Platform 📚</div>
                        <div className={styles.cardSubTitle}>We offer a lot of Examples and Guides for free on our Website,
                          which we are expanding continuously.
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </p>
              </Col>
            </Row>
          </Container>
        </div>

      </main>
    </Layout >
  );
};
export default App;