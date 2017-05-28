(module
 (type $i (func (result i32)))
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
 (type $iv (func (param i32)))
 (type $v (func))
 (type $iiv (func (param i32 i32)))
 (type $fFv (func (param f32 f64)))
 (type $Ff (func (param f64) (result f32)))
 (memory $0 256)
 (export "memory" (memory $0))
 (export "dropPrefix" (func $MyClass$instanceFunctionVoid))
 (export "dontDropPrefix" (func $dontDropPrefix))
 (export "dropPostfix" (func $MyClass$instanceFunctionVoid))
 (export "dontDropPostfix" (func $MyClass$staticFunctionInt))
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
 (func $MyClass$instanceFunctionVoid (type $iv) (param $0 i32)
  (nop)
 )
 (func $MyClass$staticFunctionInt (type $ii) (param $0 i32) (result i32)
  (get_local $0)
 )
 (func $dontDropPrefix (type $ii) (param $0 i32) (result i32)
  (i32.add
   (get_local $0)
   (i32.const 1)
  )
 )
 (func $dropBinary (type $iiv) (param $0 i32) (param $1 i32)
  (nop)
 )
 (func $dontDropBinary (type $iii) (param $0 i32) (param $1 i32) (result i32)
  (i32.add
   (get_local $0)
   (get_local $1)
  )
 )
 (func $ifFloat (type $fFv) (param $0 f32) (param $1 f64)
  (loop $continue$1.1
   (br_if $continue$1.1
    (i32.trunc_s/f32
     (get_local $0)
    )
   )
  )
  (loop $continue$2.1
   (br_if $continue$2.1
    (i32.trunc_s/f32
     (get_local $0)
    )
   )
  )
  (loop $continue$3.1
   (br_if $continue$3.1
    (i32.trunc_s/f64
     (get_local $1)
    )
   )
  )
  (loop $continue$4.1
   (br_if $continue$4.1
    (i32.trunc_s/f64
     (get_local $1)
    )
   )
  )
 )
 (func $ternary (type $iii) (param $0 i32) (param $1 i32) (result i32)
  (select
   (select
    (i32.const 0)
    (i32.const 1)
    (i32.eq
     (get_local $0)
     (get_local $1)
    )
   )
   (i32.const 65535)
   (i32.gt_s
    (get_local $0)
    (get_local $1)
   )
  )
 )
 (func $overflow (type $i) (result i32)
  (i32.const 254)
 )
 (func $castIntToFloat (type $if) (param $0 i32) (result f32)
  (f32.reinterpret/i32
   (get_local $0)
  )
 )
 (func $castLongToDouble (type $IF) (param $0 i64) (result f64)
  (f64.reinterpret/i64
   (get_local $0)
  )
 )
 (func $castFloatToInt (type $fi) (param $0 f32) (result i32)
  (i32.reinterpret/f32
   (get_local $0)
  )
 )
 (func $castDoubleToLong (type $FI) (param $0 f64) (result i64)
  (i64.reinterpret/f64
   (get_local $0)
  )
 )
 (func $typeAlias (type $Ff) (param $0 f64) (result f32)
  (f32.demote/f64
   (get_local $0)
  )
 )
 (func $testDo (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (set_local $1
   (i32.const 0)
  )
  (loop $continue$1.1
   (br_if $continue$1.1
    (i32.lt_s
     (tee_local $1
      (i32.add
       (get_local $1)
       (i32.const 1)
      )
     )
     (get_local $0)
    )
   )
  )
  (get_local $1)
 )
 (func $testWhile (type $ii) (param $0 i32) (result i32)
  (local $1 i32)
  (set_local $1
   (i32.const 0)
  )
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
  (get_local $1)
 )
 (func $empty (type $v)
  (unreachable)
 )
 (func $host (type $ii) (param $0 i32) (result i32)
  (drop
   (grow_memory
    (get_local $0)
   )
  )
  (current_memory)
 )
)
