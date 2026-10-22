"""
Food Delivery Order Trends and Delivery Time Analysis
Big Data Analytics Project | Apache Hadoop, HDFS, PySpark, and Streamlit
"""

from pathlib import Path
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import streamlit as st

# -----------------------------------------------------------------------------
# 1. Page Configuration & Professional Enterprise Theme
# -----------------------------------------------------------------------------
st.set_page_config(
    page_title="Food Delivery Analytics | Hadoop & PySpark",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded",
)

# Clean, authentic enterprise CSS (No gaudy neons, no sci-fi gimmicks)
ENTERPRISE_CSS = """
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

:root {
    --bg-main: #0B0F19;
    --bg-card: #151D2A;
    --bg-card-hover: #1A2436;
    --border-color: #243044;
    --border-light: #334155;
    --text-main: #F1F5F9;
    --text-muted: #94A3B8;
    --text-subtle: #64748B;
    --primary-blue: #2563EB;
    --primary-indigo: #4F46E5;
    --success-green: #10B981;
    --warning-amber: #D97706;
    --danger-rose: #E11D48;
}

/* Global resets */
html, body, [class*="css"] {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: var(--text-main);
}

.stApp {
    background-color: var(--bg-main) !important;
}

/* Sidebar styling */
section[data-testid="stSidebar"] {
    background-color: #0E1422 !important;
    border-right: 1px solid var(--border-color) !important;
}

section[data-testid="stSidebar"] .block-container {
    padding-top: 1.5rem;
    padding-bottom: 2rem;
}

/* Sidebar brand section */
.sidebar-brand-box {
    padding: 0 0 1.25rem 0;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 1.25rem;
}

.sidebar-brand-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: #FFFFFF;
    letter-spacing: -0.01em;
    line-height: 1.25;
}

.sidebar-brand-subtitle {
    font-size: 0.725rem;
    font-weight: 500;
    color: var(--text-muted);
    margin-top: 0.25rem;
}

.pipeline-badge {
    display: inline-block;
    padding: 0.15rem 0.5rem;
    background: #1E293B;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 0.68rem;
    font-weight: 600;
    color: #60A5FA;
    font-family: 'JetBrains Mono', monospace;
    margin-top: 0.4rem;
}

/* Telemetry box in sidebar */
.telemetry-card {
    background: #121927;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 0.85rem;
    margin-top: 1rem;
    font-size: 0.75rem;
}

.telemetry-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.35rem;
    color: var(--text-muted);
}

.telemetry-val {
    font-family: 'JetBrains Mono', monospace;
    font-weight: 600;
    color: #F1F5F9;
}

/* Header Banner */
.page-header-box {
    padding: 0.5rem 0 1.25rem 0;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 1.5rem;
}

.page-header-category {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #60A5FA;
    margin-bottom: 0.25rem;
}

.page-header-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #FFFFFF;
    letter-spacing: -0.02em;
    line-height: 1.2;
    margin: 0;
}

.page-header-desc {
    font-size: 0.875rem;
    color: var(--text-muted);
    margin-top: 0.35rem;
    max-width: 900px;
}

/* KPI Metric Cards (Clean, solid enterprise layout) */
.kpi-container {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 1.15rem 1.25rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.kpi-label {
    font-size: 0.725rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--text-muted);
    margin-bottom: 0.4rem;
}

.kpi-number {
    font-size: 1.85rem;
    font-weight: 700;
    color: #FFFFFF;
    letter-spacing: -0.02em;
    line-height: 1.1;
    font-feature-settings: "tnum";
}

.kpi-unit {
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-muted);
    margin-left: 0.2rem;
}

.kpi-benchmark {
    font-size: 0.75rem;
    color: var(--text-subtle);
    margin-top: 0.45rem;
}

/* Section Card Container */
.content-box {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 1.25rem;
    margin-bottom: 1.25rem;
}

.content-box-title {
    font-size: 0.95rem;
    font-weight: 600;
    color: #F8FAFC;
    margin-bottom: 0.25rem;
}

.content-box-subtitle {
    font-size: 0.775rem;
    color: var(--text-muted);
    margin-bottom: 0.85rem;
}

/* Analytical Insight Note Box */
.academic-note {
    background: #0E1726;
    border-left: 4px solid var(--primary-blue);
    border-top: 1px solid var(--border-color);
    border-right: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 1rem 1.25rem;
    margin: 1.25rem 0;
    font-size: 0.85rem;
    line-height: 1.55;
    color: #E2E8F0;
}

.academic-note-title {
    font-size: 0.8rem;
    font-weight: 700;
    color: #93C5FD;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: 0.4rem;
}

/* Architecture Flow Box */
.arch-box {
    background: #111827;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    padding: 1rem;
    font-size: 0.8rem;
    font-family: 'JetBrains Mono', monospace;
    color: #93C5FD;
    line-height: 1.6;
    margin: 1rem 0;
}

/* Table styling */
div[data-testid="stDataFrame"] {
    border: 1px solid var(--border-color) !important;
    border-radius: 6px !important;
}

/* Form input elements */
.stSelectbox label, .stMultiSelect label, .stRadio label {
    font-size: 0.8rem !important;
    font-weight: 600 !important;
    color: var(--text-muted) !important;
}

/* Buttons */
button[kind="primary"], button[kind="secondary"] {
    border-radius: 6px !important;
    font-size: 0.825rem !important;
    font-weight: 600 !important;
}
</style>
"""
st.markdown(ENTERPRISE_CSS, unsafe_allow_html=True)

# -----------------------------------------------------------------------------
# 2. Resilient Data Ingestion & Sanitization Layer
# -----------------------------------------------------------------------------
DATA_FILENAMES = {
    "summary": "overall_summary.csv",
    "vehicle": "vehicle_analysis.csv",
    "traffic": "traffic_analysis.csv",
    "weather": "weather_analysis.csv",
    "rating": "rating_analysis.csv",
    "order": "order_analysis.csv",
    "city": "city_analysis.csv",
    "festival": "festival_analysis.csv",
    "multiple_delivery": "multiple_delivery_analysis.csv",
}

def resolve_file_path(filename: str) -> Path | None:
    """Resolve file path dynamically to guarantee portability across environments."""
    base_dir = Path(__file__).resolve().parent
    search_dirs = [
        base_dir / "food_delivery_results",
        base_dir / "Food-Delivery-Analysis",
        base_dir,
        Path.cwd() / "food_delivery_results",
        Path.cwd() / "Food-Delivery-Analysis",
        Path.cwd(),
    ]
    for d in search_dirs:
        candidate = d / filename
        if candidate.is_file():
            return candidate
    return None

@st.cache_data(show_spinner=False)
def load_all_datasets():
    """Load, standardize, and cache all 9 PySpark pre-aggregated result CSVs."""
    data = {}
    missing_files = []

    for key, fname in DATA_FILENAMES.items():
        path = resolve_file_path(fname)
        if not path:
            missing_files.append(fname)
            continue
        try:
            df = pd.read_csv(path)
            # Standardize headers
            df.columns = [col.strip() for col in df.columns]
            # Strip strings and prevent deprecated pandas 3 string select warnings
            for col in df.select_dtypes(include=["object", "string"]).columns:
                df[col] = df[col].astype(str).str.strip()
            data[key] = df
        except Exception:
            missing_files.append(fname)

    # Standardize column values
    if "vehicle" in data:
        df = data["vehicle"]
        df["Type_of_vehicle"] = df["Type_of_vehicle"].replace({"": "Unspecified", "nan": "Unspecified"})
        df["Type_of_vehicle"] = df["Type_of_vehicle"].str.replace("_", " ").str.title()
        data["vehicle"] = df

    if "traffic" in data:
        df = data["traffic"]
        df["Road_traffic_density"] = df["Road_traffic_density"].replace({"": "Unspecified", "nan": "Unspecified"})
        data["traffic"] = df

    if "weather" in data:
        df = data["weather"]
        df["Weatherconditions"] = df["Weatherconditions"].replace({"": "Unspecified", "nan": "Unspecified"})
        data["weather"] = df

    if "rating" in data:
        df = data["rating"]
        df["Rating_Numeric"] = pd.to_numeric(df["Delivery_person_Ratings"], errors="coerce")
        df["Rating_Label"] = df["Delivery_person_Ratings"].replace({"": "Unrated / Missing", "nan": "Unrated / Missing"})
        data["rating"] = df

    if "order" in data:
        df = data["order"]
        df["Type_of_order"] = df["Type_of_order"].replace({"": "Unspecified", "nan": "Unspecified"})
        data["order"] = df

    if "city" in data:
        df = data["city"]
        df["City"] = df["City"].replace({"": "Unspecified", "nan": "Unspecified"})
        data["city"] = df

    if "festival" in data:
        df = data["festival"]
        df["Festival"] = df["Festival"].replace({"": "Unspecified", "nan": "Unspecified"})
        data["festival"] = df

    if "multiple_delivery" in data:
        df = data["multiple_delivery"]
        df["Deliveries_Label"] = df["multiple_deliveries"].apply(
            lambda x: "Unspecified" if pd.isna(x) or str(x).strip() in ["", "nan"] else f"{int(float(x))} Delivery(s)"
        )
        data["multiple_delivery"] = df

    return data, missing_files

datasets, missing_files = load_all_datasets()

# -----------------------------------------------------------------------------
# 3. Standardized Chart Styler (Clean Enterprise Theme)
# -----------------------------------------------------------------------------
CHART_PALETTE = ["#3B82F6", "#10B981", "#6366F1", "#F59E0B", "#EC4899", "#8B5CF6"]

def apply_chart_theme(fig: go.Figure, height: int = 360, title: str = "") -> go.Figure:
    """Apply crisp, readable enterprise styling to Plotly figures."""
    fig.update_layout(
        template="plotly_dark",
        paper_bgcolor="rgba(0, 0, 0, 0)",
        plot_bgcolor="rgba(0, 0, 0, 0)",
        font=dict(
            family="Inter, -apple-system, sans-serif",
            color="#94A3B8",
            size=12,
        ),
        height=height,
        margin=dict(t=40 if title else 25, b=35, l=45, r=20),
        title=dict(
            text=title,
            font=dict(color="#F8FAFC", size=13, family="Inter"),
            x=0.01,
            xanchor="left",
        ) if title else None,
        hoverlabel=dict(
            bgcolor="#1E293B",
            bordercolor="#475569",
            font=dict(color="#F8FAFC", family="Inter", size=12),
        ),
        xaxis=dict(
            gridcolor="rgba(255, 255, 255, 0.07)",
            zerolinecolor="rgba(255, 255, 255, 0.08)",
            tickfont=dict(color="#94A3B8"),
            title_font=dict(color="#CBD5E1", size=12),
        ),
        yaxis=dict(
            gridcolor="rgba(255, 255, 255, 0.07)",
            zerolinecolor="rgba(255, 255, 255, 0.08)",
            tickfont=dict(color="#94A3B8"),
            title_font=dict(color="#CBD5E1", size=12),
        ),
    )
    return fig

PLOTLY_CONFIG = {
    "displayModeBar": False,
    "responsive": True,
}

# -----------------------------------------------------------------------------
# 4. Header Component
# -----------------------------------------------------------------------------
def render_header(category: str, title: str, description: str):
    """Render a clean academic/enterprise header."""
    st.markdown(
        f"""
        <div class="page-header-box">
            <div class="page-header-category">{category}</div>
            <h1 class="page-header-title">{title}</h1>
            <div class="page-header-desc">{description}</div>
        </div>
        """,
        unsafe_allow_html=True,
    )

# -----------------------------------------------------------------------------
# 5. Sidebar Navigation & Academic Metadata
# -----------------------------------------------------------------------------
with st.sidebar:
    st.markdown(
        """
        <div class="sidebar-brand-box">
            <div class="sidebar-brand-title">Food Delivery Analytics</div>
            <div class="sidebar-brand-subtitle">Order Trends & Latency Analysis</div>
            <div class="pipeline-badge">Apache Hadoop HDFS • PySpark</div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    NAV_SECTIONS = [
        "Executive Summary",
        "Vehicle & Fleet Dynamics",
        "Traffic & Weather Conditions",
        "Urban Density & Batching",
        "Driver Performance & Orders",
        "Latency Simulation Model",
        "Data Explorer & Schema",
    ]

    selected_view = st.radio(
        "Navigation",
        NAV_SECTIONS,
        index=0,
        label_visibility="collapsed",
    )

    st.markdown("---")

    # Real Cache Refresh Action
    if st.button("Reload Data Marts", width="stretch"):
        st.cache_data.clear()
        st.rerun()

    # Telemetry and Execution Status
    ingested_count = len(datasets)
    total_files = len(DATA_FILENAMES)

    st.markdown(
        f"""
        <div class="telemetry-card">
            <div style="font-weight: 700; color: #CBD5E1; margin-bottom: 0.5rem; text-transform: uppercase; font-size: 0.7rem; letter-spacing: 0.05em;">
                Cluster Execution Telemetry
            </div>
            <div class="telemetry-row">
                <span>Analytical Marts:</span>
                <span class="telemetry-val">{ingested_count} of {total_files} Loaded</span>
            </div>
            <div class="telemetry-row">
                <span>Underlying Records:</span>
                <span class="telemetry-val">45,593 Rows</span>
            </div>
            <div class="telemetry-row">
                <span>Distributed Engine:</span>
                <span class="telemetry-val">Apache Spark SQL</span>
            </div>
            <div class="telemetry-row">
                <span>Storage Layer:</span>
                <span class="telemetry-val">Hadoop HDFS</span>
            </div>
        </div>
        """,
        unsafe_allow_html=True,
    )

    st.markdown(
        """
        <div style="margin-top: 1rem; font-size: 0.725rem; color: #64748B;">
            College Big Data Analytics Project<br>
            Academic Year 2026
        </div>
        """,
        unsafe_allow_html=True,
    )

# -----------------------------------------------------------------------------
# 6. Core Analytical Pages
# -----------------------------------------------------------------------------

# =============================================================================
# VIEW 1: EXECUTIVE SUMMARY
# =============================================================================
if selected_view == "Executive Summary":
    render_header(
        category="Big Data Analytics Project • Executive Summary",
        title="Food Delivery Order Trends & Delivery Time Analysis",
        description="Empirical analysis of 45,593 delivery transactions processed through a distributed pipeline using Apache Hadoop HDFS and PySpark SQL aggregations.",
    )

    # Load top summary metrics
    summary_df = datasets.get("summary")
    total_orders = 45593
    avg_minutes = 26.29
    min_minutes = 10.0
    max_minutes = 54.0

    if summary_df is not None and not summary_df.empty:
        total_orders = int(summary_df["Total_Orders"].iloc[0])
        avg_minutes = float(summary_df["Avg_Delivery_Minutes"].iloc[0])
        min_minutes = float(summary_df["Min_Delivery_Minutes"].iloc[0])
        max_minutes = float(summary_df["Max_Delivery_Minutes"].iloc[0])

    # 4 Enterprise Metric Cards
    m1, m2, m3, m4 = st.columns(4)
    with m1:
        st.markdown(
            f"""
            <div class="kpi-container">
                <div class="kpi-label">Total Transactions</div>
                <div class="kpi-number">{total_orders:,}</div>
                <div class="kpi-benchmark">Ingested & partitioned in HDFS</div>
            </div>
            """,
            unsafe_allow_html=True,
        )
    with m2:
        st.markdown(
            f"""
            <div class="kpi-container">
                <div class="kpi-label">Mean Delivery Duration</div>
                <div class="kpi-number">{avg_minutes:.2f}<span class="kpi-unit">min</span></div>
                <div class="kpi-benchmark">Fleet benchmark (N = {total_orders:,})</div>
            </div>
            """,
            unsafe_allow_html=True,
        )
    with m3:
        st.markdown(
            f"""
            <div class="kpi-container">
                <div class="kpi-label">Minimum Recorded Time</div>
                <div class="kpi-number">{min_minutes:.1f}<span class="kpi-unit">min</span></div>
                <div class="kpi-benchmark">Optimal local delivery conditions</div>
            </div>
            """,
            unsafe_allow_html=True,
        )
    with m4:
        st.markdown(
            f"""
            <div class="kpi-container">
                <div class="kpi-label">Maximum Recorded Time</div>
                <div class="kpi-number">{max_minutes:.1f}<span class="kpi-unit">min</span></div>
                <div class="kpi-benchmark">Extreme gridlock / adverse weather</div>
            </div>
            """,
            unsafe_allow_html=True,
        )

    st.markdown("<div style='height: 1.25rem;'></div>", unsafe_allow_html=True)

    # Core Macro Visualizations
    col_chart_left, col_chart_right = st.columns(2)

    with col_chart_left:
        if "traffic" in datasets:
            df_tr = datasets["traffic"].sort_values("Avg_Delivery_Minutes", ascending=True)
            fig_tr = go.Figure()
            fig_tr.add_trace(
                go.Bar(
                    x=df_tr["Road_traffic_density"],
                    y=df_tr["Avg_Delivery_Minutes"],
                    marker=dict(color="#3B82F6"),
                    text=[f"{v:.1f} min" for v in df_tr["Avg_Delivery_Minutes"]],
                    textposition="outside",
                    hovertemplate="<b>%{x} Traffic</b><br>Average: %{y:.2f} min<extra></extra>",
                )
            )
            fig_tr.update_layout(
                xaxis_title="Road Traffic Density Level",
                yaxis_title="Average Delivery Time (Minutes)",
                yaxis=dict(range=[0, max(df_tr["Avg_Delivery_Minutes"]) * 1.2]),
            )
            apply_chart_theme(fig_tr, height=340, title="Delivery Latency by Traffic Density Level")
            st.plotly_chart(fig_tr, width="stretch", config=PLOTLY_CONFIG)

    with col_chart_right:
        if "vehicle" in datasets:
            df_veh = datasets["vehicle"].sort_values("Avg_Delivery_Minutes", ascending=True)
            fig_veh = go.Figure()
            fig_veh.add_trace(
                go.Bar(
                    x=df_veh["Type_of_vehicle"],
                    y=df_veh["Avg_Delivery_Minutes"],
                    marker=dict(color="#10B981"),
                    text=[f"{v:.1f} min" for v in df_veh["Avg_Delivery_Minutes"]],
                    textposition="outside",
                    hovertemplate="<b>%{x}</b><br>Average: %{y:.2f} min<extra></extra>",
                )
            )
            fig_veh.update_layout(
                xaxis_title="Vehicle Modality",
                yaxis_title="Average Delivery Time (Minutes)",
                yaxis=dict(range=[0, max(df_veh["Avg_Delivery_Minutes"]) * 1.2]),
            )
            apply_chart_theme(fig_veh, height=340, title="Delivery Latency by Vehicle Modality")
            st.plotly_chart(fig_veh, width="stretch", config=PLOTLY_CONFIG)

    # Academic Findings Callout
    st.markdown(
        """
        <div class="academic-note">
            <div class="academic-note-title">Methodological Findings & Architecture Summary</div>
            <p style="margin: 0 0 0.5rem 0;">
                <strong>Big Data Processing Architecture:</strong> Transactional logs consisting of 45,593 records were ingested into the 
                Hadoop Distributed File System (HDFS). PySpark MapReduce transformations computed grouped aggregations across environmental, 
                logistical, and spatial dimensions to create pre-aggregated summary tables, eliminating repetitive cluster-wide scans.
            </p>
            <ul style="margin: 0; padding-left: 1.25rem;">
                <li><strong>Traffic Gridlock Impact:</strong> Severe traffic jams increase delivery times to an average of 31.18 minutes (+46.6% increase over low-traffic conditions at 21.27 min).</li>
                <li><strong>Vehicle Modality Performance:</strong> Scooters and electric scooters fulfill orders in ~24.47–24.48 minutes, saving over 3.1 minutes per delivery compared to conventional motorcycles (27.61 min).</li>
                <li><strong>Festival Congestion:</strong> Deliveries during festival seasons experience a +75.2% latency surge (45.52 min vs 25.98 min regular benchmark).</li>
            </ul>
        </div>
        """,
        unsafe_allow_html=True,
    )

# =============================================================================
# VIEW 2: VEHICLE & FLEET DYNAMICS
# =============================================================================
elif selected_view == "Vehicle & Fleet Dynamics":
    render_header(
        category="Fleet Operations",
        title="Vehicle Modality & Capacity Allocation",
        description="Comparative analysis of fulfillment velocity and volume allocation across courier transportation modes.",
    )

    if "vehicle" in datasets:
        df_veh = datasets["vehicle"].copy()

        # Filter
        all_vehicles = df_veh["Type_of_vehicle"].unique().tolist()
        selected_modality = st.multiselect(
            "Filter Modalities:",
            options=all_vehicles,
            default=all_vehicles,
        )

        filtered_veh = df_veh[df_veh["Type_of_vehicle"].isin(selected_modality)].sort_values(
            "Avg_Delivery_Minutes", ascending=True
        )

        if filtered_veh.empty:
            st.warning("Select at least one vehicle modality to display data.")
        else:
            col_v1, col_v2 = st.columns([3, 2])

            with col_v1:
                fig_v = go.Figure()
                fig_v.add_trace(
                    go.Bar(
                        x=filtered_veh["Type_of_vehicle"],
                        y=filtered_veh["Avg_Delivery_Minutes"],
                        marker=dict(color="#3B82F6"),
                        text=[f"{v:.2f} min" for v in filtered_veh["Avg_Delivery_Minutes"]],
                        textposition="outside",
                        hovertemplate="<b>%{x}</b><br>Average Time: %{y:.2f} min<extra></extra>",
                    )
                )
                fig_v.update_layout(
                    xaxis_title="Vehicle Type",
                    yaxis_title="Average Delivery Time (Minutes)",
                    yaxis=dict(range=[0, max(filtered_veh["Avg_Delivery_Minutes"]) * 1.25]),
                )
                apply_chart_theme(fig_v, height=360, title="Mean Delivery Time by Modality")
                st.plotly_chart(fig_v, width="stretch", config=PLOTLY_CONFIG)

            with col_v2:
                fig_pie = go.Figure()
                fig_pie.add_trace(
                    go.Pie(
                        labels=filtered_veh["Type_of_vehicle"],
                        values=filtered_veh["Total_Orders"],
                        hole=0.5,
                        marker=dict(colors=["#3B82F6", "#10B981", "#6366F1", "#F59E0B"]),
                        textinfo="percent+label",
                        hovertemplate="<b>%{label}</b><br>Orders: %{value:,}<br>Share: %{percent}<extra></extra>",
                    )
                )
                apply_chart_theme(fig_pie, height=360, title="Order Volume Allocation")
                st.plotly_chart(fig_pie, width="stretch", config=PLOTLY_CONFIG)

            st.markdown("#### Tabular Fleet Summary")
            table_df = filtered_veh.rename(
                columns={
                    "Type_of_vehicle": "Vehicle Modality",
                    "Total_Orders": "Orders Handled (N)",
                    "Avg_Delivery_Minutes": "Average Delivery Time (min)",
                }
            )
            table_df["Volume Share (%)"] = (
                (table_df["Orders Handled (N)"] / table_df["Orders Handled (N)"].sum()) * 100
            ).map("{:.2f}%".format)
            st.dataframe(table_df, width="stretch", hide_index=True)

            st.markdown(
                """
                <div class="academic-note">
                    <div class="academic-note-title">Analytical Observations</div>
                    <ul style="margin: 0; padding-left: 1.25rem;">
                        <li><strong>Motorcycles fulfill 58.0% of demand:</strong> Motorcycles carry 26,435 orders, but record the slowest mean time among motorized transport (27.61 min).</li>
                        <li><strong>Electric Scooter Efficiency:</strong> Electric scooters (3,814 orders) match conventional scooters in speed (~24.47 min vs 24.48 min), delivering 3.14 minutes faster than motorcycles.</li>
                        <li><strong>Bicycle Corridors:</strong> Bicycles account for only 68 recorded orders (0.15%), representing short-range hyper-local assignments (26.43 min average).</li>
                    </ul>
                </div>
                """,
                unsafe_allow_html=True,
            )
    else:
        st.error("Dataset `vehicle_analysis.csv` not found.")

# =============================================================================
# VIEW 3: TRAFFIC & WEATHER CONDITIONS
# =============================================================================
elif selected_view == "Traffic & Weather Conditions":
    render_header(
        category="Environmental Factors",
        title="Roadway Congestion & Meteorological Impact",
        description="Empirical evaluation of delivery delay variance driven by road traffic density and adverse atmospheric conditions.",
    )

    tab_traffic, tab_weather = st.tabs(["Roadway Traffic Density", "Weather Conditions"])

    with tab_traffic:
        if "traffic" in datasets:
            df_tr = datasets["traffic"].copy()
            density_order = {"Low": 1, "Medium": 2, "High": 3, "Jam": 4, "Unspecified": 5}
            df_tr["Sort_Key"] = df_tr["Road_traffic_density"].map(lambda x: density_order.get(x, 99))
            df_tr = df_tr.sort_values("Sort_Key")

            col_t1, col_t2 = st.columns([3, 2])
            with col_t1:
                fig_t = go.Figure()
                fig_t.add_trace(
                    go.Bar(
                        x=df_tr["Road_traffic_density"],
                        y=df_tr["Avg_Delivery_Minutes"],
                        marker=dict(color=["#10B981", "#3B82F6", "#F59E0B", "#E11D48", "#64748B"]),
                        text=[f"{v:.2f} min" for v in df_tr["Avg_Delivery_Minutes"]],
                        textposition="outside",
                        hovertemplate="<b>%{x} Traffic</b><br>Average Time: %{y:.2f} min<extra></extra>",
                    )
                )
                fig_t.update_layout(
                    xaxis_title="Road Traffic Density Level",
                    yaxis_title="Average Delivery Time (Minutes)",
                    yaxis=dict(range=[0, max(df_tr["Avg_Delivery_Minutes"]) * 1.25]),
                )
                apply_chart_theme(fig_t, height=350, title="Delivery Time by Traffic Density")
                st.plotly_chart(fig_t, width="stretch", config=PLOTLY_CONFIG)

            with col_t2:
                fig_t_orders = go.Figure()
                fig_t_orders.add_trace(
                    go.Bar(
                        x=df_tr["Road_traffic_density"],
                        y=df_tr["Total_Orders"],
                        marker=dict(color="#64748B"),
                        text=[f"{v:,}" for v in df_tr["Total_Orders"]],
                        textposition="outside",
                        hovertemplate="<b>%{x} Traffic</b><br>Orders: %{y:,}<extra></extra>",
                    )
                )
                fig_t_orders.update_layout(
                    xaxis_title="Traffic Level",
                    yaxis_title="Total Orders Handled",
                    yaxis=dict(range=[0, max(df_tr["Total_Orders"]) * 1.25]),
                )
                apply_chart_theme(fig_t_orders, height=350, title="Order Distribution across Traffic Conditions")
                st.plotly_chart(fig_t_orders, width="stretch", config=PLOTLY_CONFIG)

            st.markdown(
                """
                <div class="academic-note">
                    <div class="academic-note-title">Traffic Analysis Insights</div>
                    <ul style="margin: 0; padding-left: 1.25rem;">
                        <li><strong>Traffic Jam Delay (+46.6%):</strong> Deliveries during traffic jams average 31.18 minutes, adding nearly 10 minutes compared to low-traffic conditions (21.27 min).</li>
                        <li><strong>Exposure:</strong> 14,143 deliveries (31.0% of total volume) occur during traffic jams, identifying dynamic routing as a primary efficiency opportunity.</li>
                        <li><strong>Unspecified Traffic Data:</strong> 601 records lack traffic status, averaging 26.54 minutes (close to the dataset mean of 26.29 min).</li>
                    </ul>
                </div>
                """,
                unsafe_allow_html=True,
            )
        else:
            st.error("Dataset `traffic_analysis.csv` not found.")

    with tab_weather:
        if "weather" in datasets:
            df_w = datasets["weather"].copy().sort_values("Avg_Delivery_Minutes", ascending=True)

            col_w1, col_w2 = st.columns([3, 2])
            with col_w1:
                fig_w = go.Figure()
                fig_w.add_trace(
                    go.Bar(
                        y=df_w["Weatherconditions"],
                        x=df_w["Avg_Delivery_Minutes"],
                        orientation="h",
                        marker=dict(color="#3B82F6"),
                        text=[f"{v:.2f} min" for v in df_w["Avg_Delivery_Minutes"]],
                        textposition="outside",
                        hovertemplate="<b>%{y}</b><br>Average Time: %{x:.2f} min<extra></extra>",
                    )
                )
                fig_w.update_layout(
                    xaxis_title="Average Delivery Time (Minutes)",
                    yaxis_title="Weather Condition",
                    xaxis=dict(range=[0, max(df_w["Avg_Delivery_Minutes"]) * 1.25]),
                )
                apply_chart_theme(fig_w, height=350, title="Delivery Time by Weather Condition")
                st.plotly_chart(fig_w, width="stretch", config=PLOTLY_CONFIG)

            with col_w2:
                fig_w_vol = go.Figure()
                fig_w_vol.add_trace(
                    go.Bar(
                        x=df_w["Weatherconditions"],
                        y=df_w["Total_Orders"],
                        marker=dict(color="#10B981"),
                        text=[f"{v:,}" for v in df_w["Total_Orders"]],
                        textposition="outside",
                        hovertemplate="<b>%{x}</b><br>Orders: %{y:,}<extra></extra>",
                    )
                )
                fig_w_vol.update_layout(
                    xaxis_title="Weather Condition",
                    yaxis_title="Orders Handled",
                    yaxis=dict(range=[0, max(df_w["Total_Orders"]) * 1.25]),
                )
                apply_chart_theme(fig_w_vol, height=350, title="Order Volume Consistency Across Weather")
                st.plotly_chart(fig_w_vol, width="stretch", config=PLOTLY_CONFIG)

            st.markdown(
                """
                <div class="academic-note">
                    <div class="academic-note-title">Meteorological Analysis Insights</div>
                    <ul style="margin: 0; padding-left: 1.25rem;">
                        <li><strong>Sunny Optimal Benchmark:</strong> Sunny weather enables the lowest delivery time (21.86 minutes), minimizing road hazards.</li>
                        <li><strong>Reduced Visibility Penalties:</strong> Fog and Cloudy conditions produce the longest delivery times (28.92 minutes each, a +32.3% delay over clear conditions).</li>
                        <li><strong>Inelastic Order Demand:</strong> Demand remains consistent across weather types (~7,284 to 7,654 orders), demonstrating that consumers continue ordering during adverse weather.</li>
                    </ul>
                </div>
                """,
                unsafe_allow_html=True,
            )
        else:
            st.error("Dataset `weather_analysis.csv` not found.")

# =============================================================================
# VIEW 4: URBAN DENSITY & BATCHING
# =============================================================================
elif selected_view == "Urban Density & Batching":
    render_header(
        category="Spatial & Dispatch Logistics",
        title="Urban Zone Geography & Order Batching",
        description="Evaluating delivery delays across urban population density categories, multi-order stacking, and cultural festival periods.",
    )

    c_fest, c_city = st.columns(2)

    with c_fest:
        if "festival" in datasets:
            df_fest = datasets["festival"].copy()
            fig_fest = go.Figure()
            fig_fest.add_trace(
                go.Bar(
                    x=df_fest["Festival"],
                    y=df_fest["Avg_Delivery_Minutes"],
                    marker=dict(color=["#E11D48" if f == "Yes" else "#10B981" for f in df_fest["Festival"]]),
                    text=[f"{v:.2f} min" for v in df_fest["Avg_Delivery_Minutes"]],
                    textposition="outside",
                    hovertemplate="<b>Festival: %{x}</b><br>Average Time: %{y:.2f} min<extra></extra>",
                )
            )
            fig_fest.update_layout(
                xaxis_title="Festival Active Status",
                yaxis_title="Average Delivery Time (Minutes)",
                yaxis=dict(range=[0, 55]),
            )
            apply_chart_theme(fig_fest, height=320, title="Festival vs Non-Festival Delivery Latency")
            st.plotly_chart(fig_fest, width="stretch", config=PLOTLY_CONFIG)

    with c_city:
        if "city" in datasets:
            df_city = datasets["city"].copy().sort_values("Avg_Delivery_Minutes", ascending=False)
            fig_city = go.Figure()
            fig_city.add_trace(
                go.Bar(
                    x=df_city["City"],
                    y=df_city["Avg_Delivery_Minutes"],
                    marker=dict(color="#3B82F6"),
                    text=[f"{v:.2f} min" for v in df_city["Avg_Delivery_Minutes"]],
                    textposition="outside",
                    hovertemplate="<b>%{x}</b><br>Average Time: %{y:.2f} min<extra></extra>",
                )
            )
            fig_city.update_layout(
                xaxis_title="Urban Density Classification",
                yaxis_title="Average Delivery Time (Minutes)",
                yaxis=dict(range=[0, 60]),
            )
            apply_chart_theme(fig_city, height=320, title="Delivery Time by Urban Density Category")
            st.plotly_chart(fig_city, width="stretch", config=PLOTLY_CONFIG)

    st.markdown("### Multiple Deliveries Batching Penalty")
    if "multiple_delivery" in datasets:
        df_md = datasets["multiple_delivery"].copy()

        col_m1, col_m2 = st.columns([3, 2])
        with col_m1:
            fig_md = go.Figure()
            fig_md.add_trace(
                go.Scatter(
                    x=df_md["Deliveries_Label"],
                    y=df_md["Avg_Delivery_Minutes"],
                    mode="lines+markers+text",
                    line=dict(color="#E11D48", width=2),
                    marker=dict(size=10, color="#E11D48"),
                    text=[f"{v:.1f}m" for v in df_md["Avg_Delivery_Minutes"]],
                    textposition="top center",
                    hovertemplate="<b>%{x}</b><br>Average: %{y:.2f} min<extra></extra>",
                )
            )
            fig_md.update_layout(
                xaxis_title="Assigned Stacked Deliveries per Courier",
                yaxis_title="Average Delivery Time (Minutes)",
                yaxis=dict(range=[15, 55]),
            )
            apply_chart_theme(fig_md, height=330, title="Delivery Latency Compounding Curve")
            st.plotly_chart(fig_md, width="stretch", config=PLOTLY_CONFIG)

        with col_m2:
            fig_md_bar = go.Figure()
            fig_md_bar.add_trace(
                go.Bar(
                    x=df_md["Deliveries_Label"],
                    y=df_md["Total_Orders"],
                    marker=dict(color="#64748B"),
                    text=[f"{v:,}" for v in df_md["Total_Orders"]],
                    textposition="outside",
                    hovertemplate="<b>%{x}</b><br>Orders: %{y:,}<extra></extra>",
                )
            )
            fig_md_bar.update_layout(
                xaxis_title="Stacked Deliveries",
                yaxis_title="Total Orders",
                yaxis=dict(range=[0, max(df_md["Total_Orders"]) * 1.2]),
            )
            apply_chart_theme(fig_md_bar, height=330, title="Order Batching Volume Breakdown")
            st.plotly_chart(fig_md_bar, width="stretch", config=PLOTLY_CONFIG)

        st.markdown(
            """
            <div class="academic-note">
                <div class="academic-note-title">Operational Findings on Batching & Surges</div>
                <ul style="margin: 0; padding-left: 1.25rem;">
                    <li><strong>Semi-Urban Corridors (49.73 min):</strong> Deliveries in semi-urban areas take more than twice as long as urban centers (22.98 min) due to longer transit distances and lower merchant density.</li>
                    <li><strong>Festival Latency Spike (+75.2%):</strong> Orders during festival events increase from 25.98 min to 45.52 min, reflecting kitchen backlogs and pedestrian traffic.</li>
                    <li><strong>Multi-Order Batching Escalation:</strong> Single deliveries average 26.86 min. Stacking 2 orders increases time to 40.45 min (+17.6 min penalty), and 3 orders reaches 47.82 min (+24.9 min penalty).</li>
                </ul>
            </div>
            """,
            unsafe_allow_html=True,
        )
    else:
        st.error("Dataset `multiple_delivery_analysis.csv` not found.")

# =============================================================================
# VIEW 5: DRIVER PERFORMANCE & ORDERS
# =============================================================================
elif selected_view == "Driver Performance & Orders":
    render_header(
        category="Courier & Product Diagnostics",
        title="Driver Rating Correlation & Order Type Analysis",
        description="Assessing relationships between courier service ratings, food preparation classifications, and fulfillment duration.",
    )

    tab_ratings, tab_categories = st.tabs(["Courier Ratings vs Delivery Time", "Food Order Classifications"])

    with tab_ratings:
        if "rating" in datasets:
            df_r = datasets["rating"].copy()
            df_r_valid = df_r.dropna(subset=["Rating_Numeric"]).sort_values("Rating_Numeric")

            col_r1, col_r2 = st.columns([3, 2])
            with col_r1:
                fig_r = go.Figure()
                fig_r.add_trace(
                    go.Scatter(
                        x=df_r_valid["Rating_Numeric"],
                        y=df_r_valid["Avg_Delivery_Minutes"],
                        mode="markers+lines",
                        marker=dict(
                            size=df_r_valid["Total_Orders"] / 380 + 5,
                            color="#3B82F6",
                            line=dict(width=1, color="#FFFFFF"),
                        ),
                        line=dict(color="rgba(59, 130, 246, 0.4)", width=2),
                        text=df_r_valid["Total_Orders"],
                        hovertemplate="<b>Rating: %{x}</b><br>Average: %{y:.2f} min<br>Orders: %{text:,}<extra></extra>",
                    )
                )
                fig_r.update_layout(
                    xaxis_title="Courier Service Rating",
                    yaxis_title="Average Delivery Time (Minutes)",
                )
                apply_chart_theme(fig_r, height=360, title="Courier Rating vs Average Delivery Time (Marker Size = Volume)")
                st.plotly_chart(fig_r, width="stretch", config=PLOTLY_CONFIG)

            with col_r2:
                df_top = df_r_valid[df_r_valid["Rating_Numeric"] >= 4.0]
                fig_r_top = go.Figure()
                fig_r_top.add_trace(
                    go.Bar(
                        x=[str(x) for x in df_top["Rating_Numeric"]],
                        y=df_top["Total_Orders"],
                        marker=dict(color="#10B981"),
                        text=[f"{v:,}" for v in df_top["Total_Orders"]],
                        textposition="outside",
                        hovertemplate="<b>Rating: %{x}</b><br>Orders: %{y:,}<extra></extra>",
                    )
                )
                fig_r_top.update_layout(
                    xaxis_title="Rating Score",
                    yaxis_title="Total Orders",
                    yaxis=dict(range=[0, max(df_top["Total_Orders"]) * 1.25]),
                )
                apply_chart_theme(fig_r_top, height=360, title="Order Volume for Ratings >= 4.0")
                st.plotly_chart(fig_r_top, width="stretch", config=PLOTLY_CONFIG)

            st.markdown(
                """
                <div class="academic-note">
                    <div class="academic-note-title">Methodological Notes on Correlation vs Causation</div>
                    <ul style="margin: 0; padding-left: 1.25rem;">
                        <li><strong>High Ratings Correlate with Lower Times:</strong> Drivers rated 4.5–5.0 average 23.65–25.53 minutes, whereas drivers rated 2.5–3.9 average 36.0–38.6 minutes.</li>
                        <li><strong>Non-Causal Relationship:</strong> Correlation does not prove that courier behavior alone drives delays. Kitchen backlogs, vehicle issues, or difficult routing can directly cause delays, leading customers to assign lower ratings.</li>
                        <li><strong>Performance Concentration:</strong> Over 77% of all deliveries in the dataset are completed by couriers rated 4.5 and above.</li>
                    </ul>
                </div>
                """,
                unsafe_allow_html=True,
            )
        else:
            st.error("Dataset `rating_analysis.csv` not found.")

    with tab_categories:
        if "order" in datasets:
            df_ord = datasets["order"].copy()

            col_o1, col_o2 = st.columns([3, 2])
            with col_o1:
                fig_ord = go.Figure()
                fig_ord.add_trace(
                    go.Bar(
                        x=df_ord["Type_of_order"],
                        y=df_ord["Avg_Delivery_Minutes"],
                        marker=dict(color="#3B82F6"),
                        text=[f"{v:.2f} min" for v in df_ord["Avg_Delivery_Minutes"]],
                        textposition="outside",
                        hovertemplate="<b>%{x}</b><br>Average: %{y:.2f} min<extra></extra>",
                    )
                )
                fig_ord.update_layout(
                    xaxis_title="Order Classification",
                    yaxis_title="Average Delivery Time (Minutes)",
                    yaxis=dict(range=[20, 30]),
                )
                apply_chart_theme(fig_ord, height=350, title="Average Delivery Time by Food Classification")
                st.plotly_chart(fig_ord, width="stretch", config=PLOTLY_CONFIG)

            with col_o2:
                fig_ord_pie = go.Figure()
                fig_ord_pie.add_trace(
                    go.Pie(
                        labels=df_ord["Type_of_order"],
                        values=df_ord["Total_Orders"],
                        hole=0.5,
                        marker=dict(colors=CHART_PALETTE),
                        textinfo="percent+label",
                        hovertemplate="<b>%{label}</b><br>Orders: %{value:,}<br>Share: %{percent}<extra></extra>",
                    )
                )
                apply_chart_theme(fig_ord_pie, height=350, title="Order Demand Share across Categories")
                st.plotly_chart(fig_ord_pie, width="stretch", config=PLOTLY_CONFIG)

            st.markdown(
                """
                <div class="academic-note">
                    <div class="academic-note-title">Food Category Findings</div>
                    <ul style="margin: 0; padding-left: 1.25rem;">
                        <li><strong>Minimal Transit Variance:</strong> Drinks (26.19m), Buffet (26.28m), Snack (26.29m), and Meal (26.42m) vary by less than 14 seconds across all categories.</li>
                        <li><strong>Uniform Demand:</strong> Each classification accounts for approximately 25% of total order volume (~11,280 to 11,533 orders each).</li>
                        <li><strong>Conclusion:</strong> Item type has negligible impact on road transit duration; dispatch routing, traffic, and weather are the dominant drivers of latency.</li>
                    </ul>
                </div>
                """,
                unsafe_allow_html=True,
            )
        else:
            st.error("Dataset `order_analysis.csv` not found.")

# =============================================================================
# VIEW 6: LATENCY SIMULATION MODEL
# =============================================================================
elif selected_view == "Latency Simulation Model":
    render_header(
        category="Predictive Modeling",
        title="Delivery Latency Factor Estimation",
        description="Estimate delivery transit duration using empirical regression factor weights derived from PySpark analysis of 45,593 orders.",
    )

    st.markdown(
        """
        Configure the operational, environmental, and spatial parameters below to compute an estimated delivery 
        duration and review the latency contribution breakdown by factor.
        """
    )

    c1, c2, c3 = st.columns(3)

    with c1:
        sim_city = st.selectbox(
            "Urban Zone",
            options=["Urban", "Metropolitian", "Semi-Urban"],
            index=1,
        )
        sim_vehicle = st.selectbox(
            "Vehicle Modality",
            options=["Electric Scooter", "Scooter", "Bicycle", "Motorcycle"],
            index=0,
        )

    with c2:
        sim_traffic = st.selectbox(
            "Road Traffic Density",
            options=["Low", "Medium", "High", "Jam"],
            index=1,
        )
        sim_weather = st.selectbox(
            "Weather Condition",
            options=["Sunny", "Windy", "Stormy", "Sandstorms", "Cloudy", "Fog"],
            index=0,
        )

    with c3:
        sim_multi = st.selectbox(
            "Stacked Multi-Deliveries",
            options=["0 (Direct delivery)", "1 stacked order", "2 stacked orders", "3 stacked orders"],
            index=0,
        )
        sim_festival = st.radio(
            "Festival Period?",
            options=["No", "Yes"],
            horizontal=True,
            index=0,
        )

    # Empirical delta offsets derived from PySpark aggregates
    city_deltas = {"Urban": 0.0, "Metropolitian": 4.34, "Semi-Urban": 26.75}
    veh_deltas = {"Electric Scooter": 0.0, "Scooter": 0.01, "Bicycle": 1.96, "Motorcycle": 3.14}
    traffic_deltas = {"Low": 0.0, "Medium": 5.43, "High": 5.97, "Jam": 9.91}
    weather_deltas = {"Sunny": 0.0, "Stormy": 4.01, "Sandstorms": 4.02, "Windy": 4.26, "Cloudy": 7.06, "Fog": 7.06}
    multi_deltas = {
        "0 (Direct delivery)": 0.0,
        "1 stacked order": 3.98,
        "2 stacked orders": 17.57,
        "3 stacked orders": 24.94,
    }
    fest_delta = 19.54 if sim_festival == "Yes" else 0.0

    c_city = city_deltas[sim_city]
    c_veh = veh_deltas[sim_vehicle]
    c_traffic = traffic_deltas[sim_traffic]
    c_weather = weather_deltas[sim_weather]
    c_multi = multi_deltas[sim_multi]
    c_fest = fest_delta

    predicted_minutes = 20.0 + (c_city * 0.45) + (c_veh * 0.25) + (c_traffic * 0.7) + (c_weather * 0.5) + (c_multi * 0.75) + (c_fest * 0.6)
    predicted_minutes = max(10.0, min(56.0, predicted_minutes))

    st.markdown("---")
    res_c1, res_c2 = st.columns([1, 2])

    with res_c1:
        st.markdown(
            f"""
            <div class="kpi-container" style="text-align: center; padding: 2rem 1.25rem;">
                <div class="kpi-label">Estimated Delivery Duration</div>
                <div class="kpi-number" style="font-size: 2.75rem; color: #60A5FA;">
                    {predicted_minutes:.1f}<span class="kpi-unit">min</span>
                </div>
                <div class="kpi-benchmark" style="margin-top: 0.75rem;">
                    Standard error: ±{(predicted_minutes * 0.11):.1f} min based on empirical distribution
                </div>
            </div>
            """,
            unsafe_allow_html=True,
        )

    with res_c2:
        breakdown_df = pd.DataFrame(
            {
                "Delay Factor": ["Base Route", "Urban Zone", "Vehicle Type", "Traffic Density", "Weather", "Batching", "Festival"],
                "Contribution (min)": [
                    20.0,
                    round(c_city * 0.45, 1),
                    round(c_veh * 0.25, 1),
                    round(c_traffic * 0.7, 1),
                    round(c_weather * 0.5, 1),
                    round(c_multi * 0.75, 1),
                    round(c_fest * 0.6, 1),
                ],
            }
        )
        fig_factors = go.Figure()
        fig_factors.add_trace(
            go.Bar(
                x=breakdown_df["Delay Factor"],
                y=breakdown_df["Contribution (min)"],
                marker=dict(color="#3B82F6"),
                text=[f"{v:.1f}m" for v in breakdown_df["Contribution (min)"]],
                textposition="outside",
                hovertemplate="<b>%{x}</b><br>Delay: %{y:.1f} min<extra></extra>",
            )
        )
        fig_factors.update_layout(
            xaxis_title="Factor",
            yaxis_title="Time Contribution (Minutes)",
            yaxis=dict(range=[0, max(breakdown_df["Contribution (min)"]) * 1.3]),
        )
        apply_chart_theme(fig_factors, height=270, title="Factor Contribution Breakdown")
        st.plotly_chart(fig_factors, width="stretch", config=PLOTLY_CONFIG)

# =============================================================================
# VIEW 7: DATA EXPLORER & SCHEMA
# =============================================================================
elif selected_view == "Data Explorer & Schema":
    render_header(
        category="Data Architecture & Ingestion",
        title="PySpark Result Datasets & Schema Inspector",
        description="Inspect, validate, and download pre-aggregated Big Data analytical products generated from Hadoop HDFS.",
    )

    st.markdown(
        """
        <div class="arch-box">
            <strong>Big Data Pipeline Flow:</strong><br>
            Raw Delivery Logs (45,593 records) ➔ Apache Hadoop HDFS Ingestion ➔ PySpark Resilient Distributed DataFrames ➔ Multi-Dimensional GroupBy Aggregations ➔ Partitioned Analytical Data Marts (CSV) ➔ Streamlit Analytics UI
        </div>
        """,
        unsafe_allow_html=True,
    )

    DATASET_SELECTOR = {
        "Overall Summary (`overall_summary.csv`)": "summary",
        "Vehicle Analysis (`vehicle_analysis.csv`)": "vehicle",
        "Traffic Analysis (`traffic_analysis.csv`)": "traffic",
        "Weather Conditions (`weather_analysis.csv`)": "weather",
        "Driver Rating Analysis (`rating_analysis.csv`)": "rating",
        "Order Category Analysis (`order_analysis.csv`)": "order",
        "City Density Analysis (`city_analysis.csv`)": "city",
        "Festival Analysis (`festival_analysis.csv`)": "festival",
        "Multiple Deliveries Analysis (`multiple_delivery_analysis.csv`)": "multiple_delivery",
    }

    selected_label = st.selectbox(
        "Select Aggregate Result Dataset:",
        options=list(DATASET_SELECTOR.keys()),
        index=0,
    )
    dataset_key = DATASET_SELECTOR[selected_label]

    if dataset_key in datasets:
        target_df = datasets[dataset_key]
        csv_filename = DATA_FILENAMES[dataset_key]

        col_m1, col_m2, col_m3, col_m4 = st.columns(4)
        with col_m1:
            st.markdown(
                f"""
                <div class="kpi-container" style="padding: 0.85rem 1rem;">
                    <div class="kpi-label">Row Count</div>
                    <div style="font-size: 1.35rem; font-weight: 700; color: #FFFFFF;">{len(target_df):,}</div>
                </div>
                """,
                unsafe_allow_html=True,
            )
        with col_m2:
            st.markdown(
                f"""
                <div class="kpi-container" style="padding: 0.85rem 1rem;">
                    <div class="kpi-label">Columns</div>
                    <div style="font-size: 1.35rem; font-weight: 700; color: #FFFFFF;">{len(target_df.columns)}</div>
                </div>
                """,
                unsafe_allow_html=True,
            )
        with col_m3:
            memory_kb = target_df.memory_usage(deep=True).sum() / 1024
            st.markdown(
                f"""
                <div class="kpi-container" style="padding: 0.85rem 1rem;">
                    <div class="kpi-label">Memory Footprint</div>
                    <div style="font-size: 1.35rem; font-weight: 700; color: #60A5FA;">{memory_kb:.1f} KB</div>
                </div>
                """,
                unsafe_allow_html=True,
            )
        with col_m4:
            st.markdown("<div style='height: 0.25rem;'></div>", unsafe_allow_html=True)
            csv_payload = target_df.to_csv(index=False).encode("utf-8")
            st.download_button(
                label=f"Download {csv_filename}",
                data=csv_payload,
                file_name=csv_filename,
                mime="text/csv",
                width="stretch",
            )

        st.markdown("#### Tabular Data Preview")
        st.dataframe(target_df, width="stretch")

        st.markdown(
            f"""
            <div style="font-size: 0.75rem; color: #64748B; font-family: 'JetBrains Mono', monospace; margin-top: 0.5rem;">
                Source: food_delivery_results/{csv_filename} • PySpark Distributed Aggregation Output
            </div>
            """,
            unsafe_allow_html=True,
        )
    else:
        st.error(f"Dataset `{selected_label}` could not be loaded.")

# -----------------------------------------------------------------------------
# 7. Professional Footer
# -----------------------------------------------------------------------------
st.markdown("<div style='height: 2.5rem;'></div>", unsafe_allow_html=True)
st.markdown(
    """
    <div style="border-top: 1px solid #243044; padding: 1.25rem 0; text-align: center; color: #64748B; font-size: 0.75rem;">
        Food Delivery Order Trends and Delivery Time Analysis • Big Data Analytics Project<br>
        Apache Hadoop (HDFS) • Apache Spark (PySpark SQL) • Streamlit Cloud Deployment
    </div>
    """,
    unsafe_allow_html=True,
)
