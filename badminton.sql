--
-- PostgreSQL database dump
--

\restrict mVqDMiIQQrmmn52FqlPT9bYN3ntNjdDhjtVKFi0i40bGV6Cao2YKRoinRP1fPhJ

-- Dumped from database version 18.4
-- Dumped by pg_dump version 18.4

-- Started on 2026-09-12 15:27:31

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 220 (class 1259 OID 16492)
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16491)
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.customers_id_seq OWNER TO postgres;

--
-- TOC entry 5061 (class 0 OID 0)
-- Dependencies: 219
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- TOC entry 228 (class 1259 OID 24640)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    order_number character varying(50) NOT NULL,
    customer_name character varying(100) NOT NULL,
    total_price numeric(10,2) NOT NULL,
    status character varying(50) DEFAULT 'Pending'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 24639)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- TOC entry 5062 (class 0 OID 0)
-- Dependencies: 227
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- TOC entry 224 (class 1259 OID 16530)
-- Name: orders_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders_items (
    id integer NOT NULL,
    order_id integer,
    product_id integer,
    quantity integer NOT NULL,
    price numeric(10,2) NOT NULL
);


ALTER TABLE public.orders_items OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16529)
-- Name: orders_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_items_id_seq OWNER TO postgres;

--
-- TOC entry 5063 (class 0 OID 0)
-- Dependencies: 223
-- Name: orders_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_items_id_seq OWNED BY public.orders_items.id;


--
-- TOC entry 222 (class 1259 OID 16503)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    price numeric(10,2) NOT NULL,
    category character varying(50),
    stock integer DEFAULT 0,
    description text,
    image character varying(255),
    image_url text
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16502)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 5064 (class 0 OID 0)
-- Dependencies: 221
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 226 (class 1259 OID 24625)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL,
    fullname text,
    role character varying(20) DEFAULT 'user'::character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 24624)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 5065 (class 0 OID 0)
-- Dependencies: 225
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4876 (class 2604 OID 16495)
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- TOC entry 4883 (class 2604 OID 24643)
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- TOC entry 4880 (class 2604 OID 16533)
-- Name: orders_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_items ALTER COLUMN id SET DEFAULT nextval('public.orders_items_id_seq'::regclass);


--
-- TOC entry 4878 (class 2604 OID 16506)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 4881 (class 2604 OID 24628)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5047 (class 0 OID 16492)
-- Dependencies: 220
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.customers (id, name, email, created_at) FROM stdin;
1	John Doe	alice@example.com	2026-08-02 16:44:20.679247
2	Bob Johnson	bob@example.com	2026-08-02 16:44:20.679247
3	Jack Wayne	jack@example.com	2026-08-02 16:44:20.679247
\.


--
-- TOC entry 5055 (class 0 OID 24640)
-- Dependencies: 228
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, order_number, customer_name, total_price, status, created_at) FROM stdin;
1	ORD-2026-001	สมชาย ใจดี	3150.00	Completed	2026-08-30 15:21:12.404412
2	ORD-2026-002	วิภาดา รักดี	650.00	Pending	2026-08-30 15:21:12.404412
3	ORD-2026-003	กิตติศักดิ์ มีสุข	2500.00	Shipped	2026-08-30 15:21:12.404412
\.


--
-- TOC entry 5051 (class 0 OID 16530)
-- Dependencies: 224
-- Data for Name: orders_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders_items (id, order_id, product_id, quantity, price) FROM stdin;
\.


--
-- TOC entry 5049 (class 0 OID 16503)
-- Dependencies: 222
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, price, category, stock, description, image, image_url) FROM stdin;
10	PRO TOUCH PRO TOUCH Speed 100 ชุดไม้แบดมินตัน	399.00	Badminton	1		\N	/uploads/product-1788692851548-551027944.webp
11	YONEX YONEX Astrox 22F ไม้แบดมินตัน	2760.00	Badminton	1	ไม้แบดมินตัน YONEX Astrox 22F มอบการใช้งานที่ยอดเยี่ยมต่อการแข่งทั้งเชิงรุกและรับด้วย Nanomesh Neo ช่วยให้เฟรมมีความยืดหยุ่นมากขึ้น ในขณะที่ความโค้งงอของก้านไม้ช่วยเพิ่มแรงในตีลูก ผสานเทคโนโลยี ISOMETRICTM ขยายจุด Sweet Spot ให้ใหญ่ขึ้นช่วยให้คุณสามารถตีลูกได้อย่างแม่นยำและรวดเร็ว	\N	/uploads/product-1788693491548-543207579.webp
12	VENSON	730.00	Shuttlecock	10	VENSON Bullet Diamond Speed 76 ลูกแบดมินตัน (แพ็ค 12 ลูก)	\N	/uploads/product-1789191864152-975701619.webp
13	YONEX	800.00	Shuttlecock	10	YONEX Aeroclear 20 ลูกแบดมินตัน	\N	/uploads/product-1789192801097-876996213.webp
14	ASICS	3920.00	Footwear	10	ASICS Court Control FF 4 Wide รองเท้า Indoor Court ผู้ใหญ่	\N	/uploads/product-1789192939487-456756166.webp
15	ASICS	4900.00	Footwear	10	ASICS Court Control FF 4 Wide รองเท้า Indoor Court ผู้ใหญ่	\N	/uploads/product-1789192981629-849481261.webp
16	NIKE	1170.00	Apparel	10	NIKE Court Victory	\N	/uploads/product-1789193039631-435583205.webp
17	YONEX	95.00	Accessories	10	YONEX AC420EX เทปพันด้ามไม้แบดมินตัน	\N	/uploads/product-1789195469217-684648287.webp
18	HEAD	550.00	Accessories	10	HEAD Pro Player ผ้าคาดศีรษะผู้ใหญ่	\N	/uploads/product-1789195534469-642958211.webp
19	YONEX	1650.00	Badminton	10	YONEX Arcsaber 7 Play ไม้แบดมินตัน	\N	/uploads/product-1789197625703-915352405.webp
\.


--
-- TOC entry 5053 (class 0 OID 24625)
-- Dependencies: 226
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, password, fullname, role) FROM stdin;
1	6810210624	123456	Student Name	user
3	alice	1234	Alice User	admin
\.


--
-- TOC entry 5066 (class 0 OID 0)
-- Dependencies: 219
-- Name: customers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.customers_id_seq', 3, true);


--
-- TOC entry 5067 (class 0 OID 0)
-- Dependencies: 227
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 3, true);


--
-- TOC entry 5068 (class 0 OID 0)
-- Dependencies: 223
-- Name: orders_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_items_id_seq', 3, true);


--
-- TOC entry 5069 (class 0 OID 0)
-- Dependencies: 221
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 19, true);


--
-- TOC entry 5070 (class 0 OID 0)
-- Dependencies: 225
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- TOC entry 4887 (class 2606 OID 16501)
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- TOC entry 4891 (class 2606 OID 16538)
-- Name: orders_items orders_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_items
    ADD CONSTRAINT orders_items_pkey PRIMARY KEY (id);


--
-- TOC entry 4897 (class 2606 OID 24651)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 4889 (class 2606 OID 16512)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 4893 (class 2606 OID 24635)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4895 (class 2606 OID 24637)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 4898 (class 2606 OID 16544)
-- Name: orders_items orders_items_product_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_items
    ADD CONSTRAINT orders_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;


-- Completed on 2026-09-12 15:27:31

--
-- PostgreSQL database dump complete
--

\unrestrict mVqDMiIQQrmmn52FqlPT9bYN3ntNjdDhjtVKFi0i40bGV6Cao2YKRoinRP1fPhJ

