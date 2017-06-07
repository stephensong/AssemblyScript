(module
 (type $iii (func (param i32 i32) (result i32)))
 (type $III (func (param i64 i64) (result i64)))
 (type $ii (func (param i32) (result i32)))
 (type $II (func (param i64) (result i64)))
 (type $FF (func (param f64) (result f64)))
 (type $ff (func (param f32) (result f32)))
 (type $FFF (func (param f64 f64) (result f64)))
 (type $fff (func (param f32 f32) (result f32)))
 (type $fi (func (param f32) (result i32)))
 (type $FI (func (param f64) (result i64)))
 (type $if (func (param i32) (result f32)))
 (type $IF (func (param i64) (result f64)))
 (type $i (func (result i32)))
 (type $iiii (func (param i32 i32 i32) (result i32)))
 (type $iv (func (param i32)))
 (type $iiv (func (param i32 i32)))
 (type $fFv (func (param f32 f64)))
 (type $Ff (func (param f64) (result f32)))
 (type $v (func))
 (memory $0 1)
 (export "memory" (memory $0))
 (export "dropPrefix" (func $dropPrefix))
 (export "dontDropPrefix" (func $dontDropPrefix))
 (export "dropPostfix" (func $dropPostfix))
 (export "dontDropPostfix" (func $dontDropPostfix))
 (export "dropBinary" (func $dropBinary))
 (export "dontDropBinary" (func $dontDropBinary))
 (export "ifFloat" (func $ifFloat))
 (export "ternary" (func $ternary))
 (export "overflow" (func $overflow))
 (export "castIntToFloat" (func $castIntToFloat))
 (export "castLongToDouble" (func $castLongToDouble))
 (export "castFloatToInt" (func $castFloatToInt))
 (export "castDoubleToLong" (func $castDoubleToLong))
 (export "typeAlias" (func $typeAlias))
 (export "testDo" (func $testDo))
 (export "testWhile" (func $testWhile))
 (export "empty" (func $empty))
 (export "host" (func $host))
 (export "testSwitch" (func $testSwitch))
 (export "testSwitch2" (func $testSwitch2))
 (func $MyClass#instanceFunctionVoid (type $iv) (param $0 i32)
 )
 (func $MyClass.staticFunctionVoid (type $iv) (param $0 i32)
 )
 (func $MyClass#instanceFunctionInt (type $iii) (param $0 i32) (param $1 i32) (result i32)
  (return
   (get_local $1)
  )
 )
 (func $MyClass.staticFunctionInt (type $iii) (param $0 i32) (param $1 i32) (result i32)
  (return
   (get_local $1)
  )
 )
 (func $dropPrefix (type $iv) (param $0 i32)
  (set_local $0
   (i32.add
    (get_local $0)
    (i32.const 1)
   )
  )
  (set_local $0
   (i32.sub
    (get_local $0)
    (i32.const 1)
   )
  )
  (drop
   (get_local $0)
  )
  (drop
   (i32.sub
    (i32.const 0)
    (get_local $0)
   )
  )
 )
 (func $dontDropPrefix (type $ii) (param $0 i32) (result i32)
  (return
   (tee_local $0
    (i32.add
     (get_local $0)
     (i32.const 1)
    )
   )
  )
 )
 (func $dropPostfix (type $iv) (param $0 i32)
  (set_local $0
   (i32.add
    (get_local $0)
    (i32.const 1)
   )
  )
  (set_local $0
   (i32.sub
    (get_local $0)
    (i32.const 1)
   )
  )
 )
 (func $dontDropPostfix (type $ii) (param $0 i32) (result i32)
  (return
   (i32.sub
    (tee_local $0
     (i32.add
      (get_local $0)
      (i32.const 1)
     )
    )
    (i32.const 1)
   )
  )
 )
 (func $dropBinary (type $iiv) (param $0 i32) (param $1 i32)
  (drop
   (i32.add
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.sub
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.mul
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.div_s
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.eq
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.ne
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.gt_s
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.ge_s
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.lt_s
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.le_s
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.rem_s
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.and
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.or
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.xor
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.shl
    (get_local $0)
    (get_local $1)
   )
  )
  (drop
   (i32.shr_s
    (get_local $0)
    (get_local $1)
   )
  )
 )
 (func $dontDropBinary (type $iii) (param $0 i32) (param $1 i32) (result i32)
  (return
   (i32.add
    (get_local $0)
    (get_local $1)
   )
  )
 )
 (func $ifFloat (type $fFv) (param $0 f32) (param $1 f64)
  (if
   (i32.trunc_s/f32
    (get_local $0)
   )
   (nop)
  )
  (block $break$1.1
   (loop $continue$1.1
    (if
     (i32.trunc_s/f32
      (get_local $0)
     )
     (block
      (nop)
      (br $continue$1.1)
     )
    )
   )
  )
  (nop)
  (block $break$2.1
   (loop $continue$2.1
    (nop)
    (br_if $continue$2.1
     (i32.trunc_s/f32
      (get_local $0)
     )
    )
   )
  )
  (if
   (i32.trunc_s/f64
    (get_local $1)
   )
   (nop)
  )
  (block $break$3.1
   (loop $continue$3.1
    (if
     (i32.trunc_s/f64
      (get_local $1)
     )
     (block
      (nop)
      (br $continue$3.1)
     )
    )
   )
  )
  (block $break$4.1
   (loop $continue$4.1
    (nop)
    (br_if $continue$4.1
     (i32.trunc_s/f64
      (get_local $1)
     )
    )
   )
  )
 )
 (func $ternary (type $iii) (param $0 i32) (param $1 i32) (result i32)
  (return
   (select
    (select
     (i32.const 0)
     (i32.const 1)
     (i32.eq
      (get_local $0)
      (get_local $1)
     )
    )
    (i32.and
     (i32.sub
      (i32.const 0)
      (i32.const 1)
     )
     (i32.const 65535)
    )
    (i32.gt_s
     (get_local $0)
     (get_local $1)
    )
   )
  )
 )
 (func $overflow (type $i) (result i32)
  (return
   (i32.and
    (i32.add
     (i32.const 255)
     (i32.const 255)
    )
    (i32.const 255)
   )
  )
 )
 (func $castIntToFloat (type $if) (param $0 i32) (result f32)
  (return
   (f32.reinterpret/i32
    (get_local $0)
   )
  )
 )
 (func $castLongToDouble (type $IF) (param $0 i64) (result f64)
  (return
   (f64.reinterpret/i64
    (get_local $0)
   )
  )
 )
 (func $castFloatToInt (type $fi) (param $0 f32) (result i32)
  (return
   (i32.reinterpret/f32
    (get_local $0)
   )
  )
 )
 (func $castDoubleToLong (type $FI) (param $0 f64) (result i64)
  (return
   (i64.reinterpret/f64
    (get_local $0)
   )
  )
 )
 (func $typeAlias (type $Ff) (param $0 f64) (result f32)
  (local $1 f32)
  (nop)
  (set_local $1
   (f32.demote/f64
    (get_local $0)
   )
  )
  (return
   (get_local $1)
  )
 )
 (func $testDo (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (set_local $1
   (i32.const 0)
  )
  (block $break$1.1
   (loop $continue$1.1
    (set_local $1
     (i32.add
      (get_local $1)
      (i32.const 1)
     )
    )
    (br_if $continue$1.1
     (i32.lt_s
      (get_local $1)
      (get_local $0)
     )
    )
   )
  )
  (return
   (get_local $1)
  )
 )
 (func $testWhile (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (set_local $1
   (i32.const 0)
  )
  (block $break$1.1
   (loop $continue$1.1
    (if
     (i32.lt_s
      (get_local $1)
      (get_local $0)
     )
     (block
      (set_local $1
       (i32.add
        (get_local $1)
        (i32.const 1)
       )
      )
      (br $continue$1.1)
     )
    )
   )
  )
  (return
   (get_local $1)
  )
 )
 (func $empty (type $v)
  (block $break$1.1
   (loop $continue$1.1
    (if
     (i32.const 1)
     (block
      (nop)
      (br $continue$1.1)
     )
    )
   )
  )
 )
 (func $host (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (set_local $1
   (grow_memory
    (get_local $0)
   )
  )
  (return
   (current_memory)
  )
 )
 (func $testSwitch (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (block $break$1.1
   (block $case3$1.1
    (block $default$1.1
     (block $case1$1.1
      (block $case0$1.1
       (set_local $1
        (get_local $0)
       )
       (br_table $case0$1.1 $case1$1.1 $case3$1.1 $default$1.1
        (select
         (i32.const 0)
         (select
          (i32.const 1)
          (select
           (i32.const 3)
           (i32.const -1)
           (i32.eq
            (get_local $1)
            (i32.const 2)
           )
          )
          (i32.eq
           (get_local $1)
           (i32.const 1)
          )
         )
         (i32.eq
          (get_local $1)
          (i32.const 3)
         )
        )
       )
      )
      (return
       (i32.const 3)
      )
     )
     (return
      (i32.const 1)
     )
    )
    (block $break$1.2
     (block $case3$1.2
      (block $case2$1.2
       (block $case1$1.2
        (block $case0$1.2
         (set_local $2
          (get_local $0)
         )
         (br_table $case0$1.2 $case1$1.2 $case2$1.2 $case3$1.2 $break$1.2
          (select
           (i32.const 0)
           (select
            (i32.const 1)
            (select
             (i32.const 2)
             (select
              (i32.const 3)
              (i32.const -1)
              (i32.eq
               (get_local $2)
               (i32.const 6)
              )
             )
             (i32.eq
              (get_local $2)
              (i32.const 5)
             )
            )
            (i32.eq
             (get_local $2)
             (i32.const 4)
            )
           )
           (i32.eq
            (get_local $2)
            (i32.const 0)
           )
          )
         )
        )
        (br $break$1.2)
       )
       (return
        (i32.const 4)
       )
      )
     )
     (return
      (i32.const 56)
     )
    )
    (return
     (i32.const 0)
    )
   )
   (return
    (i32.const 2)
   )
  )
 )
 (func $testSwitch2 (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (block $break$1.1
   (block $case2$1.1
    (block $default$1.1
     (block $case0$1.1
      (set_local $1
       (get_local $0)
      )
      (br_table $case0$1.1 $case2$1.1 $default$1.1
       (select
        (i32.const 0)
        (select
         (i32.const 2)
         (i32.const -1)
         (i32.eq
          (get_local $1)
          (i32.const 2)
         )
        )
        (i32.eq
         (get_local $1)
         (i32.const 1)
        )
       )
      )
     )
     (return
      (i32.const 1)
     )
    )
   )
   (set_local $0
    (i32.const 2)
   )
  )
  (return
   (get_local $0)
  )
 )
)
