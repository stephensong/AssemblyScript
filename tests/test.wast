(module
 (type $Fi (func (param f64) (result i32)))
 (type $fi (func (param f32) (result i32)))
 (type $F (func (result f64)))
 (memory $0 1)
 (export "std/globals.ts/isNaN" (func $std/globals.ts/isNaN))
 (export "std/globals.ts/isNaNf" (func $std/globals.ts/isNaNf))
 (export "testDouble" (func $testDouble))
 (export "testLong" (func $testLong))
 (export "testNaN" (func $std/globals.ts/isNaN))
 (func $std/globals.ts/isNaN (type $Fi) (param $0 f64) (result i32)
  (f64.ne
   (get_local $0)
   (get_local $0)
  )
 )
 (func $std/globals.ts/isNaNf (type $fi) (param $0 f32) (result i32)
  (f32.ne
   (get_local $0)
   (get_local $0)
  )
 )
 (func $testDouble (type $F) (result f64)
  (local $0 f64)
  (local $1 f64)
  (if
   (f64.eq
    (tee_local $0
     (f64.const 4)
    )
    (tee_local $1
     (f64.const 5)
    )
   )
   (return
    (get_local $0)
   )
  )
  (get_local $1)
 )
 (func $testLong (type $F) (result f64)
  (local $0 i64)
  (local $1 i64)
  (if
   (i64.eq
    (tee_local $0
     (i64.const 4)
    )
    (tee_local $1
     (i64.const 5)
    )
   )
   (return
    (f64.convert_s/i64
     (get_local $0)
    )
   )
  )
  (f64.convert_s/i64
   (get_local $1)
  )
 )
)
