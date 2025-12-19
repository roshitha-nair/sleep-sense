from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
from io import BytesIO
from datetime import datetime
import os

# ============================
# BRAND CONSTANTS
# ============================
PRIMARY_COLOR = (79 / 255, 70 / 255, 229 / 255)  # Indigo
GRAY = (0.45, 0.45, 0.45)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
LOGO_PATH = os.path.join(BASE_DIR, "..", "assets", "logo.png")


def generate_sleep_report_pdf(user_email, records, avg_score, quality_count, tips):
    buffer = BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4
# ============================
    # HEADER BAR
    # ============================
    header_height = 110
    pdf.setFillColorRGB(*PRIMARY_COLOR)
    pdf.rect(0, height - header_height, width, header_height, fill=1)

    # 1. Logo (Centered at the top)
    if os.path.exists(LOGO_PATH):
        logo_width = 45 # Slightly smaller to fit stacked layout
        logo_height = 45
        logo = ImageReader(LOGO_PATH)
        pdf.drawImage(
            logo,
            (width - logo_width) / 2, # Center horizontally
            height - 55,              # Position at the top of the bar
            width=logo_width,
            height=logo_height,
            mask="auto",
            preserveAspectRatio=True,
        )

    # 2. Title (Centered below logo)
    pdf.setFillColorRGB(1, 1, 1)
    pdf.setFont("Helvetica-Bold", 22) # Reduced size slightly for better fit
    pdf.drawCentredString(width / 2, height - 80, "Sleep Sense")

    # 3. Subtitle (Centered at bottom of header)
    pdf.setFont("Helvetica", 12)
    pdf.drawCentredString(
        width / 2, height - 98, "Personal Sleep Health Report"
    )

    # ============================
    # META INFO
    # ============================
    y = height - 140
    pdf.setFillColorRGB(*GRAY)
    pdf.setFont("Helvetica", 11)
    pdf.drawString(40, y, f"User: {user_email}")
    pdf.drawRightString(
        width - 40,
        y,
        f"Generated: {datetime.now().strftime('%d %b %Y, %H:%M')}",
    )

    pdf.line(40, y - 12, width - 40, y - 12)

    # ============================
    # SUMMARY
    # ============================
    y -= 45
    pdf.setFillColorRGB(0, 0, 0)
    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(40, y, "Summary")

    y -= 28
    pdf.setFont("Helvetica", 12)
    pdf.drawString(40, y, f"Total Records: {len(records)}")

    y -= 22
    pdf.drawString(40, y, f"Average Sleep Score: {round(avg_score)}")

    # ============================
    # QUALITY DISTRIBUTION
    # ============================
    y -= 40
    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(40, y, "Sleep Quality Distribution")

    y -= 28
    pdf.setFont("Helvetica", 12)
    for quality, count in quality_count.items():
        pdf.drawString(60, y, f"{quality}: {count}")
        y -= 20

    # ============================
    # TIPS SECTION
    # ============================
    y -= 30
    pdf.setFont("Helvetica-Bold", 14)
    pdf.drawString(40, y, "Personalized Sleep Tips")

    y -= 28
    pdf.setFont("Helvetica", 12)
    for tip in tips:
        pdf.drawString(60, y, f"• {tip}")
        y -= 20

    # ============================
    # FOOTER
    # ============================
    pdf.setFont("Helvetica", 10)
    pdf.setFillColorRGB(*GRAY)
    pdf.drawCentredString(
        width / 2,
        30,
        "Sleep Sense — AI-powered Sleep Quality Analysis",
    )

    pdf.showPage()
    pdf.save()
    buffer.seek(0)
    return buffer
