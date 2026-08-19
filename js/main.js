/* ============================================================
   main.js — สคริปต์ของหน้าเว็บ
   1) ใส่ปีปัจจุบันในกรอบท้ายกระดาษ
   2) สลับโหมดสีสว่าง/มืด
   3) คัดลอกอีเมลเมื่อกดขา Email

   หมายเหตุ:
   ไฟล์นี้เป็น JavaScript ธรรมดา ไม่ใช่ ES Module
   ============================================================ */


/* ============================================================
   รอให้ HTML โหลดเสร็จก่อน
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {


  /* ==========================================================
     1) ใส่ปีปัจจุบัน
     ========================================================== */

  // ดึง element ที่มี id="year"
  var yearEl = document.getElementById("year");

  if (yearEl) {
    // ปี ค.ศ. + 543 = ปี พ.ศ.
    var buddhistYear = new Date().getFullYear() + 543;

    yearEl.textContent = "พ.ศ. " + buddhistYear;
  }


  /* ==========================================================
     2) สลับโหมดสีสว่าง / มืด
     ========================================================== */

  // ปุ่มเปลี่ยนธีม
  var toggleBtn = document.getElementById("modeToggle");

  // ข้อความบนปุ่ม
  var modeLabel = document.getElementById("modeLabel");


  // ตรวจสอบว่ามีปุ่มจริงหรือไม่
  if (toggleBtn) {

    toggleBtn.addEventListener("click", function () {

      // เพิ่ม/ถอด class "negative" ที่ body
      //
      // ถ้าไม่มี negative
      // → เพิ่ม negative → ธีมมืด
      //
      // ถ้ามี negative
      // → ลบ negative → กลับธีมสว่าง

      var isNegative = document.body.classList.toggle("negative");


      // เปลี่ยนข้อความบนปุ่ม
      // ป้องกัน Error กรณีไม่มี modeLabel

      if (modeLabel) {
        modeLabel.textContent = isNegative
          ? "POSITIVE"
          : "NEGATIVE";
      }

    });

  }


  /* ==========================================================
     3) คัดลอกอีเมล
     ========================================================== */

  var hintEl = document.getElementById("copyHint");

  var copyLinks = document.querySelectorAll("[data-copy]");

  var hintDefault = hintEl
    ? hintEl.textContent
    : "";


  // วนทุกลิงก์ที่มี data-copy
  copyLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

      // ดึงข้อความจาก data-copy
      var text = link.getAttribute("data-copy");


      // ถ้า browser ไม่รองรับ Clipboard API
      // ให้ปล่อยลิงก์ทำงานตามปกติ
      if (!navigator.clipboard) {
        return;
      }


      // ป้องกันไม่ให้เปิดลิงก์ mailto ทันที
      event.preventDefault();


      // คัดลอกข้อความ
      navigator.clipboard.writeText(text).then(

        // คัดลอกสำเร็จ
        function () {
          showHint("คัดลอกแล้ว: " + text);
        },

        // คัดลอกไม่สำเร็จ
        function () {
          showHint(
            "คัดลอกไม่สำเร็จ กดค้างที่ลิงก์เพื่อคัดลอกเอง"
          );
        }

      );

    });

  });


  /* ==========================================================
     แสดงข้อความแจ้งผลการคัดลอก
     ========================================================== */

  function showHint(message) {

    // ถ้าไม่มี copyHint ให้หยุด
    if (!hintEl) {
      return;
    }


    // เปลี่ยนข้อความ
    hintEl.textContent = message;


    // หลังจาก 2.5 วินาที
    // ให้กลับไปเป็นข้อความเดิม
    window.setTimeout(function () {

      hintEl.textContent = hintDefault;

    }, 2500);

  }

});